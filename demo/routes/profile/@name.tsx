import type { Context } from "../../../packages/types/args.ts";
import { renderToString } from "preact-render-to-string";

export default function Profile(context: Context) {
  return context.html(
    renderToString(
      <>
        <h1>My name is {context.req.param('name')}</h1>
      </>
    )
  );
}