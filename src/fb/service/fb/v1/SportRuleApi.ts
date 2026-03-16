import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1SportRuleApi {
    public list(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/sportRule/list', params, req)
    }
}