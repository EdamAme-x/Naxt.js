import { html } from "$naxtjs/helper/html/mod.ts";

export default function Index(context) {

    const page = html`
        <h1>Welcome to Naxt.js 🔥</h1>
        ${Date.now()}
    `

    return context.html(page);
}