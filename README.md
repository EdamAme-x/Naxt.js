# 🔥 Naxt.js

_Naxt.js_ is a framework based on [Hono](https://github.com/honojs/hono)🔥.
We are aiming for a **Japanese-made** framework.

<img src="/assets/icon.png" alt="naxt-js-logo" width="200" />

### Ultra-fast framework 🔥

on 🦕 Deno and ... coming soon.

## Installation
`deno run -A https://raw.githubusercontent.com/EdamAme-x/Naxt.js/main/assets/install.ts my-app`

## Features

### Routing is done in File-Dir Base. & NoBuild & EasyMinifier & LiveReload & Many Middlewares

#### Example

```markdown
|-routes
|-@id
  |-- profile.jsx
|-- index.js
|-- about.ts
|-api
  |-- firebase.ts
```

In the above file structure...

`Req: /index => index.js`
`Req: /about => about.ts`
`Req: /api/firebase => firebase.ts`
`Req: /:id/profile => profile.jsx`

File extensions are prioritized and routed in the following order: `tsx` => `jsx` => `ts` => `js`

The file must contain the following code.

```js
export default function Index({ context, connInfo }) {
  return context.html(`
    <h1>Hello Naxt.js!</h1>
  `);
}
```

The arguments are the same as for Hono.
However, some of them are unique. Please refer to the documentation.

URLpattern(as /user/@id as /user/:id) can also be used for routing.

#### Examples
/user/:id => /user/@id(.js)
/user/* => /user/_all(.ts)
/*/profile => /_all/profile(.jsx)
/:id/profile => /_all/profile(.tsx)

Normal files (photos, etc.) will be routed as usual.
