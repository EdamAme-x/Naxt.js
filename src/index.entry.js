import { HonoApp, Serve } from "./server/mod.js"
import { env } from "./env.js"

// ルーティング用
import { path_utils } from "./utils/mods.js"

export class Naxt {
    constructor(map, config) {
        this.#map = map;
        this.#config = config;

        this.#port = config.naxt.port;
        this.#headConfig = config.heads;

        this.#honoApp = HonoApp; // new Hono
        this.#serve = Serve;
    }

    start() {
        this.routing();
    }

    routing() {
        this.#honoApp.get("/", (c) => c.html("hi!"));
    }
}