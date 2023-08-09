import { HonoApp, Serve } from "./server/mod.js"
import { env } from "./env.js"

// ルーティング用
import { path_utils } from "./utils/mods.js"

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
    }

    start() {
        this.routing();
    }

    routing() {

        // root / アクセス時の処理 => /index
        this._honoApp.get("/", (c) => c.html("Hello World"));

        // /books/ の場合は /books/index | /booksは /books 
        // 先に画像等のファイルを検索 無かったら SearchPath で検索 そしてRenderServerSideJSX
        this._honoApp.get("/:id", (c) => c.html(c.req.param("id")));

        env.startLog();

        this._serve(this._honoApp.fetch, {
            port: this._port
        });
    }
}