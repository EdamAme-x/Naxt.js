import type { Context } from "../../../packages/types/args.ts";
export default function Profile(context: Context) {
  return context.html(`
        My name is ${context.req.param("name")}
    `);
}
