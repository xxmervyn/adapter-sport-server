import { Hono } from "hono";
import { fromHono } from "chanfana";
import { VirtualV1StatGetByMatchId } from "./getByMatchId";

export const FbVirtualV1StatRouter = fromHono(new Hono());
FbVirtualV1StatRouter.post("/getByMatchId", VirtualV1StatGetByMatchId);
