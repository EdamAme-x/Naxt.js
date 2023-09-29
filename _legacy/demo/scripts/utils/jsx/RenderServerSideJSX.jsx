import { renderToString } from "https://esm.sh/*preact-render-to-string@6.2.0";
import { initCSS } from "./initCSS.js";
import { hotReload } from "./hotReload.js";
import { renderJSX } from "../render/renderJSX.jsx";

export function renderServerSideJSX(contextJSX, headJSX, config, token, contextReq) {
    if (contextJSX.jsx_component() === undefined) {
        contextJSX.jsx_component() = x => <> Undefined </>;
    }

    let [mainViewString, HeadString] = renderJSX(contextJSX.jsx_component({
        param: contextJSX.id_routing,
        req: contextReq
    }));

    const configCopy = {...config};

    let hotReloadScript = hotReload(token, configCopy);

    let config_heads = config.heads; // headsに変換

    if (config_heads === undefined) {
        config_heads = {
            lang: "en",
            ogprefix: encodeURIComponent("og: https://ogp.me/ns#")
        };
    }else {
        config_heads = {
            lang: config_heads.lang,
            ogprefix: encodeURIComponent(config.ogprefix)
        }
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
        <html lang="${config_heads.lang}">
            <head prefix="${decodeURIComponent(config_heads.ogprefix)}">
                ${renderToString(dafaultCSS)}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charset="utf-8" />
                <link rel="shortcut icon" href="/static/favicon.ico" />
                ${HeadString == "" ? renderToString(headJSX) : HeadString}

                <link rel="stylesheet" href="/static/global.css" />

                <meta name="render-scripts" content="naxtjs"/>
            </head>
            <body>
                <div id="naxt">
                    ${mainViewString ? mainViewString : renderToString(contextJSX.jsx_component())}
                </div>

                <script type="text/json">
                    ${JSON.stringify(ServerDataProps)}
                </script>
                ${hotReloadScript}
            </body>
        </html>
    `

    return renderString; // <p>a</p>のjsx.Element を文字列に変換 [renderString, Head]
}