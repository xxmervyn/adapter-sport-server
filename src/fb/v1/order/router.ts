import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderNewRouter } from "./new/router";
import { FbV1OrderCashOutRouter } from "./cashOut/router";
export const FbV1OrderRouter = fromHono(new Hono());


FbV1OrderRouter.route("/new",FbV1OrderNewRouter);
FbV1OrderRouter.route("/cashOut",FbV1OrderCashOutRouter);