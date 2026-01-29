import { Hono } from "hono";
import { fromHono } from "chanfana";
import { AccessCheck } from "./accessCheck";
export const FbUserRouter = fromHono(new Hono());


FbUserRouter.post("/accessCheck",AccessCheck)