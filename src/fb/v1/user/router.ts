import { Hono } from "hono";
import { fromHono } from "chanfana";
import { AccessCheck } from "./accessCheck";
import { V1UserBase } from "./base";
export const FbV1UserRouter = fromHono(new Hono());


FbV1UserRouter.post("/accessCheck",AccessCheck)
FbV1UserRouter.post("/base", V1UserBase);