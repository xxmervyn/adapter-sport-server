import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderReserveGetBetParameter } from "./getBetParameter";

export const FbV1OrderReserveRouter = fromHono(new Hono());

FbV1OrderReserveRouter.post("/getBetParameter", FbV1OrderReserveGetBetParameter);
