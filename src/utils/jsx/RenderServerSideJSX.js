import { renderToString } from "https://esm.sh/*preact-render-to-string@6.2.0";

export function renderServerSideJSX(context) {
    return renderToString(context);
}