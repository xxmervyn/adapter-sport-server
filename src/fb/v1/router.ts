import { Hono } from "hono";
import { fromHono } from "chanfana";
import {FbUserRouter} from "./user/router"
import {FbMerchantRouter} from "./merchant/router"
export const FbV1Router = fromHono(new Hono());


FbV1Router.route("/user",FbUserRouter);
FbV1Router.route("/merchant",FbMerchantRouter);
