import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1SportApi {

    public theme(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/sport/theme', params, req)
    }

}