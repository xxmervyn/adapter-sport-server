import { Hono } from "hono";
import { fromHono } from "chanfana";
import { VirtualV1MatchStatistical } from "./statistical";

export const FbVirtualV1MatchRouter = fromHono(new Hono());
FbVirtualV1MatchRouter.post("/statistical", VirtualV1MatchStatistical);
