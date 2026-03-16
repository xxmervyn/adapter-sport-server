import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class VirtualV1StatApi {
    public getByMatchId(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/virtual/v1/stat/getByMatchId', params, req)
    }
}