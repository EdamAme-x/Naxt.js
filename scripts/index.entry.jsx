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

        this._headConfig = config.heads;

        this._honoApp = HonoApp; // new Hono
        this._serve = Serve;

        this._dir = config.naxt.path.replace("/naxt.config.js", "");

        // if (this._dir.startsWith("src/")) {
        //     this._dir = "/" + this._dir;
        // }
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
                    try {
                        console.log(Deno.cwd())
                        return serveFile(c.rawRequest, decodeURIComponent((this._dir + `\\view\\${staticMaps[i]}` + resolvedPath).replace("file:///", "").replaceAll("/", "\\")));
                    } catch (error) {
                        console.log("Not Static File \n" + error);
                    }
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