import { Hono } from "hono";
import { fromHono } from "chanfana";
import { V1BulletinListTop } from "./listTop";

export const FbV1BulletinRouter = fromHono(new Hono());
FbV1BulletinRouter.post("/listTop", V1BulletinListTop);
