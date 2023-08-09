import $0 from "./view/index.jsx";
import $1 from "./view/id/[id].jsx"
import $2 from "./view/profile.jsx";
import $3 from "./view/_404.jsx";

import $$0 from "./api/getDateNow.js";

// auto creation

const naxtMap = {
    "view": {
        "/index": $0(),
        "/id/[id]": $1(),
        "/profile": $2()
    },
    "api": {
        "/api/getDateNow": $$0()
    },
    "_404": $3()
}


export { naxtMap }