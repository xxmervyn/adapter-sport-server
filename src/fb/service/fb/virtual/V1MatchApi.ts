import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class VirtualV1MatchApi {
    public getMatchListWithResults(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/virtual/v1/match/getMatchListWithResults', params, req)
    }

    public statistical(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/virtual/v1/match/statistical', params, req, null, { retry: 2, retryDelay: 1000 })
    }

    public getList(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/virtual/v1/match/getList', params, req)
    }

    public getMatchDetail(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/virtual/v1/match/getMatchDetail', params, req)
    }


}