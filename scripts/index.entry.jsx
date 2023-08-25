import { HonoApp, Serve } from "./server/mod.js";
import { env } from "./env.js";

// ルーティング用
import { path_utils } from "./utils/mods.js";

// SSR用
import { jsx_utils } from "./utils/mods.js";

// Hydrate用

export class Naxt {
  constructor(map, config) {
    this._map = map;
    this._config = config;

    this._port = config.naxt.port;

    this._headConfig = config.heads;

    this._honoApp = HonoApp; // new Hono
    this._serve = Serve;

    this._dir = config.naxt.path.replace("/naxt.config.js", "");
    this._os = Deno.build.os;
  }

  start() {
    this.routing();
  }

  routing() {
    const hotReloadToken = Date.now();

    // root / アクセス時の処理 => /index
    this._honoApp.get("/", (c) => {
      try {
        const currentPath = "/index";

        let alive_check_token = ""; // ホットリロード

        if (this._config.naxt.dev) {
          alive_check_token = hotReloadToken; // 再起動の度に変更

          if (currentPath === "/_alive_check") {
            return c.text(alive_check_token);
          }
        }

        const renderTargetComponent = path_utils.SearchPath(
          currentPath,
          this._map[this._map.routes],
          this._map._404,
        );
        const shareClientComponent = jsx_utils.renderServerSideJSX(
          renderTargetComponent,
          !1,
          this._config,
          alive_check_token,
        );
        return c.html(shareClientComponent);
      } catch (e) {
        return this.errorHandler(e, c);
      }
    });

    // /books/ の場合は /books/index | /booksは /books
    // 先に画像等のファイルを検索 無かったら SearchPath で検索 そしてRenderServerSideJSX
    this._honoApp.get("/*", (c) => {
      try {
        const currentPath = c._path;

        let alive_check_token = ""; // ホットリロード

        if (this._config.naxt.dev) {
          alive_check_token = hotReloadToken; // 再起動の度に変更

          if (currentPath === "/_alive_check") {
            return c.text(alive_check_token);
          }
        }

        const staticFileRouter = this.staticRouter(currentPath, c);

        if (staticFileRouter !== null || staticFileRouter !== undefined) {
          return staticFileRouter;
        }

        const renderTargetComponent = path_utils.SearchPath(
          currentPath,
          this._map[this._map.routes],
          this._map._404,
        );
        const shareClientComponent = jsx_utils.renderServerSideJSX(
          renderTargetComponent,
          !1,
          this._config,
          alive_check_token,
        );
        return c.html(shareClientComponent);
      } catch (e) {
        return this.errorHandler(e, c);
      }
    });

    env.startLog();

    this._serve(this._honoApp.fetch, {
      port: this._port,
    });
  }

  errorHandler(e, c) {
    if (this.dev) {
        return c.html(e)
    }
  }

  staticRouter(currentPath, c, ) {
    const staticMaps = this._map["static"];

    for (let i = 0; i < staticMaps.length; i++) {
      if (currentPath.startsWith(`/${staticMaps[i]}`)) {
        // /static/img.svg => /img.svg
        const resolvedPath = currentPath.replace(`/${staticMaps[i]}`, "");
        try {
          let file_content;
          if (this._os === ("windows")) {
            file_content = Deno.readFileSync(
              decodeURIComponent(
                (this._dir + `\\${this._map.routes}\\${staticMaps[i]}` +
                  resolvedPath).replaceAll("/", "\\").replace(
                    "file:\\\\\\",
                    "",
                  ),
              ),
            );
          } else {
            file_content = Deno.readFileSync(
              new URL(
                decodeURIComponent(
                  (this._dir + `/${this._map.routes}\\/${staticMaps[i]}` +
                    resolvedPath).replace("file:///", "file:///")
                    .replaceAll(
                      "/",
                      "/",
                    ),
                ),
              ),
            );
          }

          return c.body(file_content);
        } catch (e) {}
      }
    } // static files

  }

  apiRouter(cuurrentPath, c) {
    const apiMaps = this._map["api"];

    const apiFunction = apiMaps[cuurrentPath];
    apiFunction(c);
  }
}
