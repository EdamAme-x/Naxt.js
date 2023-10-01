import { NaxtServer } from "$naxtjs/server/mod.ts";

const { args } = Deno;

const server = new NaxtServer(
  import.meta.url.replace("/main.ts", "") + "/routes/",
  8080,
  {
    liveReload: args[0] === "--dev" ? true : false,
    onInit: (c) => {
      console.log(
        ` %c${c.req.method ? c.req.method : "Unknown"} ${c.req.path}`,
        "color: #0FF000"
      );
    }, // Functions executed at access time on all routes
  }
);

server.fire();
