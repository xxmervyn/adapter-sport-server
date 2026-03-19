import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderCashOutReserveApi {
    public bet(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/cashOutReserve/bet', params, req)
    }
    
    public cancel(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/cashOutReserve/cancel', params, req)
    }
}