# Welcome to Naxt.js 🔥

<div style="display: flex; justify-content: between; align-items: center; margin-top: 16px"> <img src="/assets/favicon.png" alt="Naxt.js" width="64" height="64"/> <p style="font-size: 24px; margin-left: 8px">Ultra-fast framework using Hono 🔥</p> </div>

## Introduction

This framework is built using **[Hono](https://github.com/honojs/hono)** and **[Deno](https://deno.land)**. In the future, `bun / nodejs` will also be supported.

### Routing is done in File Structure Base. and NoBuild.

```text
|-routes
    |-- index.js
    |-- about.ts
    |-api
      |-- firebase.ts
```

In the above file structure...

`Req: /index => /index.js`  
`Req: /about => /about.ts`  
`Req: /api/firebase => /api/firebase.ts`  

The file must contain the following code.

```js
export default function Index({ context, connInfo }) {
  return context.html(`
    <h1>Hello Naxt.js!</h1>
  `);
}
```

The arguments are the same as for Hono.
However, some of them are unique. Later description.

URLpattern(as /user/@id as /user/:id) can also be used for routing.

Normal files (photos, etc.) will be routed as usual.

```text
|-routes
    |-- index.js
    |-- about.ts
    |-api
      |-- firebase.ts
    |-photos
      |-- index.css
```

`Req: /photos/index.css => /photos/index.css`

... in the middle of writing