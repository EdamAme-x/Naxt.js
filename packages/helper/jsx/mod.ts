
import { renderToString } from 'https://esm.sh/*preact-render-to-string@6.2.0';
import { minifyHTML } from "https://deno.land/x/minifier@v1.1.1/mod.ts";

export function renderJSX(jsx: any): string {

    const html_string: string = renderToString(jsx);

    return minifyHTML(html_string, {
        minifyCSS: true,
        minifyJS: true,
    });
}
