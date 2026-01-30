import { Hono } from "hono";
import { fromHono } from "chanfana";
import { V1OrderNewReserveBetList } from "./list";

export const FbV1OrderNewReserveRouter = fromHono(new Hono());
FbV1OrderNewReserveRouter.post("/betList", V1OrderNewReserveBetList);
