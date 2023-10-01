import { html } from "$naxtjs/helper/html/mod.ts";
import { LiveReload } from "$naxtjs/helper/live/mod.ts";

export default function Index(context) {

    const page = html`
    <html>
    <head lang="ja">
        <title>Naxt.js Initial Page 🔥</title>
        <meta charset="UTF-8">
        <link rel="icon" href="/static/favicon.png" type="image/x-icon">
        <link rel="stylesheet" href="/static/index.css">    
    </head>
    <body>
        <h1>Welcome to Naxt.js 🔥</h1>
        ${Date.now()}
        ${LiveReload()}
    </body>
    </html>
    `

    return context.html(page);
}