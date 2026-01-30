import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderNewBetRouter } from "./bet/router";

export const FbV1OrderNewRouter = fromHono(new Hono());

FbV1OrderNewRouter.route("/bet", FbV1OrderNewBetRouter);
