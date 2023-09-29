import { NaxtServer } from "$naxtjs/server/mod.ts";

const server = new NaxtServer(import.meta.url.replace('/main.ts', '') + '/routes/', 8080);

server.fire();