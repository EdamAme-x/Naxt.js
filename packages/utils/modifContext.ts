import { Context } from 'https://deno.land/x/hono/context.ts';

export type CustomContext = Context & {
    htmx: Function
};
export function modifContext(c: CustomContext): Context {
    
    c.htmx = (code: string, ...resp: any) => {
        code = `
        ${code}
        <script src="https://cdn.jsdelivr.net/npm/htmx.org/dist/htmx.min.js"></script>
        `

        return c.html(code, ...resp)
    }

    return c as Context;
}