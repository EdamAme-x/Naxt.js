// デプロイ用
import { Naxt } from "naxtjs";

import { config } from "./naxt.config.js";
import { naxtMap } from "./naxt.map.js";

config.naxt.dev = !1;

const app = new Naxt(naxtMap, config);

app.start()