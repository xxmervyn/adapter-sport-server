import { Hono } from "hono";
import { fromHono } from "chanfana";
import { MerchantDetail } from "./detail";
export const FbV1MerchantRouter = fromHono(new Hono());


FbV1MerchantRouter.post("/detail",MerchantDetail)