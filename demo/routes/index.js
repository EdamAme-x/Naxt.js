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
        <img src="/static/favicon.png" alt="icon" width="240" />
        <h1>Welcome to Naxt.js 🔥</h1>
        <p>Edit <code>routes/index.js</code> to get started!</p>
        <h2>Ultrafast Fullstack Framework on Hono 🔥</h2>
        ${new Date()}
        ${LiveReload()}
    </body>
    </html>
    `

    return context.html(page);
}