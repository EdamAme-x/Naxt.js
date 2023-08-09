import { renderToString } from "https://esm.sh/*preact-render-to-string@6.2.0";
import { initCSS } from "./initCSS.js";

export function renderServerSideJSX(contextJSX, headJSX, config) {
    if (contextJSX === undefined) {
        contextJSX = <>Undefined</>;
    }

    if (config === undefined || !config) {
        config = {
            lang: "en",
            ogprefix: "og: https://ogp.me/ns#"
        };
    }

    if (!headJSX) {
        headJSX = <>
            <title>NaxtJS App</title>
            <meta name="description" content="NaxtJS App" />
        </>;
    }

    const dafaultCSS = <>
        <style naxt-init-css>
            {
                initCSS()
            }
        </style>
    </>

    const ServerDataProps = {
        
    }
    
    // contextJSX.id_routing => [id]


    const renderString = `
        <!DOCTYPE html>
        <html lang="${config.lang}">
            <head prefix=${config.ogprefix}>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charset="utf-8" />
                ${renderToString(headJSX)}

                <link rel="shortcut icon" href="/static/favicon.ico" />
                <link rel="stylesheet" href="/static/global.css" />

                <meta name="render-scripts" content="naxtjs"/>
                ${renderToString(dafaultCSS)}
            </head>
            <body>
                <div id="naxt">
                    ${renderToString(contextJSX.jsx_component)}
                </div>

                <script type="text/json">
                    ${JSON.stringify(ServerDataProps)}
                </script>

            </body>
        </html>
    `

    return renderString; // <p>a</p>のjsx.Element を文字列に変換
}