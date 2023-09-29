import { Hono } from "https://deno.land/x/hono/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { FW_Utils } from "https://deno.land/x/framework_utils/mod.ts";
import { ParseRelativePath } from "./../utils/parseRelativePath.ts";

export class NaxtServer {
  basePath: string;
  port: number;
  hono: Hono;
  routes: {
    target: string; // /api/:id
    module: {
      default: Function;
    };
  }[] = [];
  checked: number = 0;

  constructor(basePath: string, port: number = 8080) {
    this.basePath = basePath;
    this.port = port ? port : 8080;

    this.hono = new Hono();

    this.routing();
  }

  routing() {
    const dirs = FW_Utils.DirectoryDraw({
      base: this.basePath,
    });
    this.checked = 0;

    for (const dir of dirs) {
      FW_Utils.DynamicImporter(dir.fullPath, this.basePath)
        .then((module) => {
          this.routes.push({
            target: ParseRelativePath(dir.relativePath),
            module: module as {
              default: Function;
            },
          });
          this.checked++;

          if (this.checked === dirs.length) {
            this.routePatch();
          }
        })
        .catch((e) => {
          console.error(e);
          this.checked++;

          if (this.checked === dirs.length) {
            this.routePatch();
          }
        });
    }
  }

  routePatch() {
    for (const route of this.routes) {
      if (route.target == "/_onError") {
        this.hono.onError(route.module.default as any);
      } else if (route.target == "/_notFound") {
        this.hono.notFound(route.module.default as any);
      }
      this.hono.all(route.target as string, route.module.default as any);
    }
  }

  async fire() {
    return serve(this.hono.fetch, { port: this.port });
  }
}
