import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderBetSinglePass } from "./singlePass";

export const FbV1OrderBetRouter = fromHono(new Hono());

FbV1OrderBetRouter.post("/singlePass", FbV1OrderBetSinglePass);
FbV1OrderBetRouter.post("/list", FbV1OrderBetSinglePass);
