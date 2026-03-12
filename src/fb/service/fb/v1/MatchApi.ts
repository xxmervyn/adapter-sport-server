import { FBNotAuthBaseApi, FBForwardBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/response/fbModel"
import { API_BASE_URL_ENUMS } from "../../../enums/apiBaseUrlEnum"
import { FbServiceEntry } from "../../entry/fbServiceEntry"

export class V1MatchApi {
    public getList(params: any) {
        return FbServiceEntry.request('/v1/match/getList', params)
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
        return FbServiceEntry.request('/v1/match/recommendMatchList', params, FBForwardBaseApi)
    }
    
    public getLiveList(params: any) {
        return FbServiceEntry.request('/v1/match/getList', params)
    }


}