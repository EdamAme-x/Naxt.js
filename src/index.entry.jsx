import { HonoApp, Serve } from "./server/mod.js"
import { env } from "./env.js"

// ルーティング用
import { path_utils } from "./utils/mods.js"
import { serveFile } from 'https://deno.land/x/std@0.140.0/http/file_server.ts'

// SSR用
import { jsx_utils } from "./utils/mods.js"

// Hydrate用



export class Naxt {
    constructor(map, config) {
        this._map = map;
        this._config = config;

        this._port = config.naxt.port;

        let _dirname = config.naxt.__dirname.split("/");
        this.__dirname = "";
        for (let h = 0; h < _dirname.length; h++) {
            if (_dirname.length - 1 === h) {
                break;
            }
            this.__dirname += "/" + _dirname[h];
        }

        this.__dirname = this.__dirname.substring(1, this.__dirname.length) + "/";

        this._headConfig = config.heads;

        this._honoApp = HonoApp; // new Hono
        this._serve = Serve;
    }

    start() {
        this.routing();
    }

    routing() {

        const hotReloadToken = Date.now();

        // root / アクセス時の処理 => /index
        this._honoApp.get("/", (c) => {
            const currentPath = "/index";

            let alive_check_token = ""; // ホットリロード

            if (this._config.naxt.dev) {
                alive_check_token = hotReloadToken; // 再起動の度に変更

                if (currentPath === "/_alive_check") {
                    return c.text(alive_check_token);
                }
            }

            const renderTargetComponent = path_utils.SearchPath(currentPath, this._map["view"], this._map._404);
            const shareClientComponent = jsx_utils.renderServerSideJSX(renderTargetComponent, !1, this._config, alive_check_token);
            return c.html(shareClientComponent);
        });

        // /books/ の場合は /books/index | /booksは /books 
        // 先に画像等のファイルを検索 無かったら SearchPath で検索 そしてRenderServerSideJSX
        this._honoApp.get("/*", (c) => {
            const currentPath = c._path;

            let alive_check_token = ""; // ホットリロード

            if (this._config.naxt.dev) {
                alive_check_token = hotReloadToken; // 再起動の度に変更

                if (currentPath === "/_alive_check") {
                    return c.text(alive_check_token);
                }
            }

            const staticMaps = this._map["static"];

            for (let i = 0; i < staticMaps.length; i++) {
                if (currentPath.startsWith(`/${staticMaps[i]}`)) {
                    // /static/img.svg => /img.svg
                    const resolvedPath = currentPath.replace(`/${staticMaps[i]}`, "");
                    return serveFile(c.rawRequest, decodeURIComponent((this.__dirname + `view/${staticMaps[i]}` + resolvedPath).replace("file:///", "").replaceAll("/", "\\")));
                }
            } // static rootに指定された物

            const renderTargetComponent = path_utils.SearchPath(currentPath, this._map["view"], this._map._404);
            const shareClientComponent = jsx_utils.renderServerSideJSX(renderTargetComponent, !1, this._config, alive_check_token);
            return c.html(shareClientComponent);
        });

        env.startLog();

        this._serve(this._honoApp.fetch, {
            port: this._port
        });
    }
}