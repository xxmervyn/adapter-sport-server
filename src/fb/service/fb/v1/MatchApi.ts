import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1MatchApi {
    public getList(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/getList', params, req)
    }
    
    public tips(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/tips', params, req)
    }

    public matchCount(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/matchCount', params, req)
    }

    public getOnSaleLeagues(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/getOnSaleLeagues', params, req)
    }

    public getMatchDetail(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/getMatchDetail', params, req)
    }

    public getBannerMatchList(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/getBannerMatchList', params, req)
    }

    public statistical(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/statistical', params, req)
    }
    
    public matchResultPage(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/matchResultPage', params, req)
    }

    public matchResultInfo(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/matchResultInfo', params, req)
    }

    public recommendMatchList(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/recommendMatchList', params, req)
    }

    public queryMatchByRecommend(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/queryMatchByRecommend', params, req)
    }

    public getLiveList(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match/getLiveList', params, req)
    }
   
    public listMarketGroup(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/match//listMarketGroup', params, req)
    }


}