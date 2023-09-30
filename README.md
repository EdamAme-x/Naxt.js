# 🔥 Naxt.js 

*Naxt.js* is a framework based on [Hono](https://github.com/honojs/hono)🔥.
We are aiming for a **Japanese-made** framework.

on 🦕 Deno and ... coming soon.

## Features

### Routing is done in File-Dir Base. & NoBuild

#### Example

```markdown
|-routes
    |-- index.js
    |-- about.ts
    |-api
        |-- firebase.ts
```

In the above file structure...

`Req: /index => index.js`
`Req: /about => about.ts`
`Req: /api/firebase => firebase.ts`

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

Normal files (photos, etc.) will be routed as usual.