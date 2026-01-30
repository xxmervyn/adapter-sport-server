import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderNewBetRouter } from "./bet/router";
import { FbV1OrderNewReserveRouter } from "./reserve/router";

export const FbV1OrderNewRouter = fromHono(new Hono());

FbV1OrderNewRouter.route("/bet", FbV1OrderNewBetRouter);
FbV1OrderNewRouter.route("/reserve", FbV1OrderNewReserveRouter);
