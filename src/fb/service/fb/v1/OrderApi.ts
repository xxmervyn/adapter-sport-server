import { FbServiceEntry } from "../../entry/fbServiceEntry"

export class V1OrderApi {
    public batchBetMatchMarketOfJumpLine(params: any) {
        return FbServiceEntry.request('/v1/order/batchBetMatchMarketOfJumpLine', params)
    }
}