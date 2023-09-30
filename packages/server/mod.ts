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
import { Page, PageClassifier } from "../types/page.ts";
import { importModuleIfSupported } from "./IfModule.ts";

export class NaxtServer {
  basePath: string;
  port: number;
  hono: Hono;
  routes: {
    target: string;
    module: Page | ErrorHandler | PageClassifier;
  }[] = [];
  checked = 0;

  constructor(basePath: string, port: number = 8080) {
    this.basePath = basePath;
    this.port = port ? port : 8080;

    this.hono = new Hono();

    this.routing();
  }

  async routing() {
    const dirs = FW_Utils.DirectoryDraw({
      base: this.basePath,
    });
    this.checked = 0;
    const start = performance.now();

    for (const dir of dirs) {
      const module = await importModuleIfSupported(dir.fullPath);
      if (module) {
        this.routes.push({
          target: ParseRelativePath(dir.relativePath),
          module: (() => {
            if (ParseRelativePath(dir.relativePath) == "/_onError") {
              return (error: Error, c: Context) => {
                try {
                  c.header("X-Powered-By", "Hono");
                  c.header("server", "deno/Naxtjs");
                } catch (_e: string | unknown) {
                  console.error(`\n\n 🌊: No Response assigned \n\n`);
                }

                return module.default(error, c);
              };
            }

            return (c: Context) => {
              try {
                c.header("X-Powered-By", "Hono");
                c.header("server", "deno/Naxtjs");
              } catch (_e: string | unknown) {
                console.error(`\n\n 🌊: No Response assigned \n\n`);
              }

              return module.default(c);
            };
          })(),
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
        console.log(
          `🔥: All routes checked / ${((performance.now() - start) / 1000)
            .toString()
            .substring(0, 6)} s`
        );
        console.log(
          `🔥: All routes patched / ${(this.routePatch() / 1000)
            .toString()
            .substring(0, 6)} s`
        );
      }
    }
  }

  routePatch() {
    console.log(`🔥: Patching...`);
    const start = performance.now();
    for (const route of this.routes) {
      try {
        if (route.target == "/_onError") {
          this.hono.onError(route.module);
        } else if (route.target == "/_notFound") {
          this.hono.notFound(route.module);
        }
        this.hono.all(route.target as string, route.module);
      } catch (e: string | unknown) {
        console.error(" 🌊: Failed Patch '" + route.target + "' \n " + e);
      }
    }

    return performance.now() - start;
  }

  fire() {
    serve(this.hono.fetch, { port: this.port });
  }

  async request(...args: unknown[]) {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    await this.hono.request(...args);
  }
}
