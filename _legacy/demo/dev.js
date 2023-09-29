import { Naxt } from "naxtjs";

import { config } from "./naxt.config.js";
import { naxtMap } from "./naxt.map.js";

const app = new Naxt(naxtMap, config);

app.start()