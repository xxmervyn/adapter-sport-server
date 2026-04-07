import { Hono } from "hono";
import { fromHono } from "chanfana";
import { VirtualV1OrderSingle } from "./bet";

export const FbVirtualV1OrderSingleRouter = fromHono(new Hono());
FbVirtualV1OrderSingleRouter.post("/single", VirtualV1OrderSingle);
