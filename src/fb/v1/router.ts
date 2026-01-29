import { Hono } from "hono";
import { fromHono } from "chanfana";
import {FbUserRouter} from "./user/router"
export const FbV1Router = fromHono(new Hono());


FbV1Router.route("/user",FbUserRouter)