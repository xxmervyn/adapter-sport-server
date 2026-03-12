import { Hono } from "hono";
import { fromHono } from "chanfana";
import { VirtualV1StatGetByMatchId } from "./getByMatchId";

export const FbVirtualV1MatchRouter = fromHono(new Hono());
FbVirtualV1MatchRouter.post("/getByMatchId", VirtualV1StatGetByMatchId);
