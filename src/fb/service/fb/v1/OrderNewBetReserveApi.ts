import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderNewBetReserveApi {
    public newReserveBetList(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/new/reserve/betList', params, req)
    }
}