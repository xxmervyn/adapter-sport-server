import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderReserveCashOutApi {
    public statusInfoByIds(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/order/reserve/cashOut/statusInfoByIds', params, req)
    }
}