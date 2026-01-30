import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbV1OrderCashOutPrice } from "./price";

export const FbV1OrderCashOutRouter = fromHono(new Hono());

FbV1OrderCashOutRouter.post("/price", FbV1OrderCashOutPrice);
