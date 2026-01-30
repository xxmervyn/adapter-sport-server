import { Hono } from "hono";
import { fromHono } from "chanfana";
import { AccessCheck } from "./accessCheck";
export const FbV1UserRouter = fromHono(new Hono());


FbV1UserRouter.post("/accessCheck",AccessCheck)