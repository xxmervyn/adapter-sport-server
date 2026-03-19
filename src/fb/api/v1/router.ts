import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1UserRouter } from "./user/router";
import { FbV1MerchantRouter } from "./merchant/router";
import { FbV1MatchRouter } from "./match/router";
import { FbV1BulletinRouter } from "./bulletin/router";
import { FbV1OrderRouter } from "./order/router";
import { FbV1SportRuleRouter } from "./sportRule/router";
import { FbV1TopicRouter } from "./topic/router";
import { FbV1SportRouter } from "./sport/router";
export const FbV1Router = fromHono(new Hono());


FbV1Router.route("/user", FbV1UserRouter);
FbV1Router.route("/merchant", FbV1MerchantRouter);
FbV1Router.route("/match", FbV1MatchRouter);
FbV1Router.route("/bulletin", FbV1BulletinRouter);
FbV1Router.route("/order", FbV1OrderRouter);
FbV1Router.route("/sportRule", FbV1SportRuleRouter);
FbV1Router.route("/topic", FbV1TopicRouter);
FbV1Router.route("/sport", FbV1SportRouter);