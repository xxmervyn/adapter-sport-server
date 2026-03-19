import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderReserveCashOutApi {
    public statusInfoByIds(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/reserve/cashOut/statusInfoByIds', params, req)
    }
}