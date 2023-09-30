import { Context } from "https://deno.land/x/hono/context.ts";
import { Next } from "https://deno.land/x/hono/mod.ts";

type ServeStaticOptions = {
  root?: string;
  path?: string;
  rewriteRequestPath?: (path: string) => string;
};

export type Page =
  | ((c: Context, next: Next) => Context | Promise<unknown> | unknown)
  | ((options: ServeStaticOptions) => Promise<unknown>);

export type PageClassifier = any; // TODO
