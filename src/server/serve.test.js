import { Serve } from "./mod.js";

Serve((req) => {
    console.log(req);
    return {
        status: 200,
        body: JSON.stringify(req)
    }
})