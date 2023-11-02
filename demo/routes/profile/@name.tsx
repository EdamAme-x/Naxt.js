import type { Context } from "$naxtjs/types/args.ts";
import { LiveReload } from "$naxtjs/helper/live/mod.tsx";
import { renderJSX } from '$naxtjs/helper/mod.ts';

export default function Profile(context: Context) {
  return context.html(
    renderJSX(
      <>
        <h1>My name is {context.req.param("name")}</h1>
        <LiveReload />
      </>
    )
  );
}