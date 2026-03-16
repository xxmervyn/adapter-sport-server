import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderNewBetApi {
    public list(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/order/new/bet/list', params, req)
    }
}