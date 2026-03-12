import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderNewRouter } from "./new/router";
import { FbV1OrderCashOutRouter } from "./cashOut/router";
import { FbV1OrderBetRouter } from "./bet/router";
import { FbV1OrderReserveRouter } from "./reserve/router";
import { V1OrderBatchBetMatchMarketOfJumpLine } from "./batchBetMatchMarketOfJumpLine";
export const FbV1OrderRouter = fromHono(new Hono());


FbV1OrderRouter.route("/reserve",FbV1OrderReserveRouter);
FbV1OrderRouter.route("/new",FbV1OrderNewRouter);
FbV1OrderRouter.route("/cashOut",FbV1OrderCashOutRouter);
FbV1OrderRouter.route("/bet",FbV1OrderBetRouter);
FbV1OrderRouter.post("/batchBetMatchMarketOfJumpLine",V1OrderBatchBetMatchMarketOfJumpLine);

