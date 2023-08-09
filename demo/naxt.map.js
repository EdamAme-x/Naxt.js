import * as $0 from "./view/index.jsx";
import * as $1 from "./view/id/[id].jsx"
import * as $2 from "./view/profile.jsx";

import * as $$0 from "./api/getDateNow.js";

import { config } from "./naxt.config.js";

// auto creation

const naxtMap = {
    "view": {
        "/index": $0,
        "/id/[id]": $1,
        "/profile": $2
    },
    "api": {
        "/api/getDateNow": $$0
    },
    "config": config
}

export { naxtMap }