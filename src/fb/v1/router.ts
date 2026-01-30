import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1UserRouter } from "./user/router";
import { FbV1MerchantRouter } from "./merchant/router";
import { FbV1MatchRouter } from "./match/router";
import { FbV1BulletinRouter } from "./bulletin/router";
export const FbV1Router = fromHono(new Hono());


FbV1Router.route("/user",FbV1UserRouter);
FbV1Router.route("/merchant",FbV1MerchantRouter);
FbV1Router.route("/match", FbV1MatchRouter);
FbV1Router.route("/bulletin", FbV1BulletinRouter);