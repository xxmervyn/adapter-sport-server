import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1MatchApi {
    public getList(params: any) {
        return FbServiceEntry.request('/v1/match/getList', params)
    }
    
    public tips(params: any) {
        return FbServiceEntry.request('/v1/match/tips', params)
    }

    public getOnSaleLeagues(params: any) {
        return FbServiceEntry.request('/v1/match/getOnSaleLeagues', params)
    }

    public getMatchDetail(params: any) {
        return FbServiceEntry.request('/v1/match/getMatchDetail', params)
    }

    public getBannerMatchList(params: any) {
        return FbServiceEntry.request('/v1/match/getBannerMatchList', params)
    }

    public statistical(params: any) {
        return FbServiceEntry.request('/v1/match/statistical', params)
    }

    public matchResultPage(params: any) {
        return FbServiceEntry.request('/v1/match/matchResultPage', params)
    }

    public matchResultInfo(params: any) {
        return FbServiceEntry.request('/v1/match/matchResultInfo', params)
    }

    public recommendMatchList(params: any) {
        return FbServiceEntry.request('/v1/match/recommendMatchList', params)
    }

    public queryMatchByRecommend(params: any) {
        return FbServiceEntry.request('/v1/match/queryMatchByRecommend', params)
    }

    public getLiveList(params: any) {
        return FbServiceEntry.request('/v1/match/getLiveList', params)
    }


}