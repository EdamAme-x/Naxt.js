import {
  ErrorHandler,
  Handler,
  Hono,
  NotFoundHandler,
} from "https://deno.land/x/hono/mod.ts";
import { serveStatic } from "../utils/serveStatic.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { FW_Utils } from "https://deno.land/x/framework_utils/mod.ts";
import { ParseRelativePath } from "./../utils/parseRelativePath.ts";
import { Context } from "https://deno.land/x/hono@v3.7.2/context.ts";
import { Page } from "../types/page.ts";

export class NaxtServer {
  basePath: string;
  port: number;
  hono: Hono;
  routes: {
    target: string; // /api/:id
    module: Page;
  }[] = [];
  checked: number = 0;

  constructor(basePath: string, port: number = 8080) {
    this.basePath = basePath;
    this.port = port ? port : 8080;

    this.hono = new Hono();

    this.routing();
  }

  async importModuleIfSupported(path: string) {
    const fileExtension = path.split(".").pop()?.toLowerCase();

    if (
      fileExtension === "js" ||
      fileExtension === "ts" ||
      fileExtension === "jsx" ||
      fileExtension === "tsx"
    ) {
      try {
        const module = await import(path);
        return module;
      } catch (e: string | unknown) {
        throw Error(
          `\n\n 🌊: There is a problem with the exported function. \n\n ${e}`
        );
      }
    }
    return null;
  }

  async routing() {
    const dirs = FW_Utils.DirectoryDraw({
      base: this.basePath,
    });
    this.checked = 0;

    for (const dir of dirs) {
      const module = await this.importModuleIfSupported(dir.fullPath);
      if (module) {
        this.routes.push({
          target: ParseRelativePath(dir.relativePath),
          module: (c: Context) => {
            try {
              c.header("X-Powered-By", "Hono");
              c.header("server", "deno/Naxtjs");
            } catch (e: string | unknown) {
              throw Error(`\n\n 🌊: No Response assigned \n\n ${e}`);
            }

            return module.default(c);
          },
        });
      } else {
        this.routes.push({
          target: dir.relativePath,
          module: serveStatic({
            root: this.basePath,
          }),
        });
      }
      this.checked++;

      if (this.checked === dirs.length) {
        this.routePatch();
      }
    }
  }

  routePatch() {
    for (const route of this.routes) {
      if (route.target == "/_onError") {
        this.hono.onError(route.module as unknown as ErrorHandler);
      } else if (route.target == "/_notFound") {
        this.hono.notFound(route.module as unknown as NotFoundHandler);
      }
      this.hono.all(route.target as string, route.module as unknown as Handler);
    }
  }

  fire() {
    serve(this.hono.fetch, { port: this.port });
  }
}
