import { Hono } from "hono";
import { fromHono } from "chanfana";
import { MerchantDetail } from "./detail";
export const FbMerchantRouter = fromHono(new Hono());


FbMerchantRouter.post("/detail",MerchantDetail)