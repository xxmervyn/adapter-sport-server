import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderReserveCashOutstatusInfoByIdsRouter } from "./statusInfoByIds";

export const FbV1OrderReserveCashOutRouter = fromHono(new Hono());

FbV1OrderReserveCashOutRouter.post("/statusInfoByIds", FbV1OrderReserveCashOutstatusInfoByIdsRouter);
