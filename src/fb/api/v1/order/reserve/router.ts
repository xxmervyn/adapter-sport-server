import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderReserveCashOutRouter } from "./cashOut/router";
import { FbV1OrderReserveGetBetParameter } from "./getBetParameter";
import { FbV1OrderReserveBet } from "./bet";
import { FbV1OrderReserveStatusInfoByIds } from "./statusInfoByIds";
import { FbV1OrderReserveUpdate } from "./update";
import { FbV1OrderReserveCancel } from "./cancel";
import { FbV1OrderReserveBetList } from "./betList";

export const FbV1OrderReserveRouter = fromHono(new Hono());

FbV1OrderReserveRouter.post("/getBetParameter", FbV1OrderReserveGetBetParameter);
FbV1OrderReserveRouter.post("/cashOut", FbV1OrderReserveCashOutRouter);
FbV1OrderReserveRouter.post("/bet", FbV1OrderReserveBet);
FbV1OrderReserveRouter.post("/statusInfoByIds", FbV1OrderReserveStatusInfoByIds);
FbV1OrderReserveRouter.post("/betList", FbV1OrderReserveBetList);
FbV1OrderReserveRouter.post("/update", FbV1OrderReserveUpdate);
FbV1OrderReserveRouter.post("/cancel", FbV1OrderReserveCancel);
