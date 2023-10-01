import { NaxtServer } from "$naxtjs/server/mod.ts";

const { args } = Deno;

const server = new NaxtServer(
  import.meta.url.replace("/main.ts", "") + "/routes/",
  8080,
  {
    liveReload: args[0] === "--dev" ? true : false,
  }
);

server.fire();
