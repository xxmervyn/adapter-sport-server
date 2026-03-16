import { Hono } from "hono";
import { fromHono } from "chanfana";
import { V1BulletinListTop } from "./listTop";
import { V1BulletinListPage } from "./listPage";

export const FbV1BulletinRouter = fromHono(new Hono());
FbV1BulletinRouter.post("/listTop", V1BulletinListTop);
FbV1BulletinRouter.post("/listPage", V1BulletinListPage);
