import { Hono } from "hono";
import { fromHono } from "chanfana";
import { V1OrderNewBetList } from "./list";

export const FbV1OrderNewBetRouter = fromHono(new Hono());
FbV1OrderNewBetRouter.post("/list", V1OrderNewBetList);
