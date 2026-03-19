import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderReserveApi {
    public getBetParameter(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/order/reserve/getBetParameter', params, req)
    }

    public bet(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/reserve/bet', params, req)
    }

    public betList(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/reserve/betList', params, req)
    }

    public update(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/reserve/update', params, req)
    }

    public cancel(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/reserve/cancel', params, req)
    }

    public statusInfoByIds(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/reserve/statusInfoByIds', params, req)
    }
}