import { SearchPath } from "./SearchPath.jsx";
import React from "https://cdn.skypack.dev/react";

const naxtMap = {
    "view": {
        "/index": <p>index</p>,
        "/id/[id]": <p>id</p>,
        "/profile": <p>profile</p>
    }
}

let error = <p>404 Not Found!!</p>

console.log(SearchPath("/index", naxtMap["view"], error));
console.log(SearchPath("/id/123", naxtMap["view"], error));
console.log(SearchPath("/profile", naxtMap["view"], error));
console.log(SearchPath("/errorhogehoge", naxtMap["view"], error));

/** good
{
  jsx_component: {
    "$$typeof": Symbol(react.element),
    type: "p",
    key: null,
    ref: null,
    props: { children: "index" },
    _owner: null
  },
  id_routing: ""
}
{
  jsx_component: {
    "$$typeof": Symbol(react.element),
    type: "p",
    key: null,
    ref: null,
    props: { children: "id" },
    _owner: null
  },
  id_routing: "123"
}
{
  jsx_component: {
    "$$typeof": Symbol(react.element),
    type: "p",
    key: null,
    ref: null,
    props: { children: "profile" },
    _owner: null
  },
  id_routing: ""
}
{
  jsx_component: {
    "$$typeof": Symbol(react.element),
    type: "p",
    key: null,
    ref: null,
    props: { children: "404 Not Found!!" },
    _owner: null
  },
  id_routing: ""
}
 */