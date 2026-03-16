import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderCashOutApi {
    public price(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/order/cashOut/price', params, req)
    }

    public bet(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/order/cashOut/bet', params, req)
    }
}