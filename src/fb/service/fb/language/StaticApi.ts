import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class LanguageStaticApi {
    public list(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/language/static/list', params, req)
    }
}