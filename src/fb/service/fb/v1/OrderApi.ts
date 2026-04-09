import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderApi {

    public batchBetMatchMarketOfJumpLine(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/order/batchBetMatchMarketOfJumpLine', params, req)
    }

    public getStakeOrderStatus(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/getStakeOrderStatus', params, req)
    }

    public betMultiple(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/betMultiple', params, req)
    }

    public earlySettlementBet(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/earlySettlementBet', params, req)
    }

    public getCashOutsByIds(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/getCashOutsByIds', params, req)
    }
}