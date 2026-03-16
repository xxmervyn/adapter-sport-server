import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderCashOutReserveBet } from "./bet";
import { FbV1OrderCashOutReserveCancel } from "./cancel";

export const FbV1OrderCashOutReserveRouter = fromHono(new Hono());

FbV1OrderCashOutReserveRouter.post("/bet", FbV1OrderCashOutReserveBet);
FbV1OrderCashOutReserveRouter.post("/cancel", FbV1OrderCashOutReserveCancel);
