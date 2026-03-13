import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderReserveApi {
    public getBetParameter(params: any) {
        return FbServiceEntry.request('/v1/order/reserve/getBetParameter', params)
    }

}