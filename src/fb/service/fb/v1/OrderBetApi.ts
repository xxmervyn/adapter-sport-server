import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderBetApi {
    public singlePass(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/bet/singlePass', params, req)
    }

    public list(params: any, req: HonoRequest) {
        return FbServiceEntry.requestNotCache('/v1/order/bet/list', params, req)
    }
}