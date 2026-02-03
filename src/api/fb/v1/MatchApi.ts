import { FBNotAuthBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/fbModel"
import { API_BASE_URL_ENUMS } from "../../../enums/apiBaseUrlEnum"

export class V1MatchApi {
    async getList(params: {
        languageType: string,
        oddsType: number,
        sportTypes: Array<number>,
        current: number,
        isPC: boolean,
        orderBy: number,
        sportId: number,
        type: number
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/match/getList', params)
    }


    async getMatchDetail(params: {
        languageType: string,
        oddsType: number,
        matchId: number
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/match/getMatchDetail', params)
    }


    async getBannerMatchList(params: {
        languageType: string,
        platform: number,
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/match/getBannerMatchList', params)
    }


    async statistical(params: {
        languageType: string,
        markets: Array<{
            id: string,
            markets: Array<{ marketType: number, period: number }>
        }>,
        sportTypes: Array<number>
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/match/statistical', params)
    }

    
    async matchResultPage(params: {
        sportId: string,
        beginTime: number,
        endTime: number,
        languageType: string,
        current: number,
        size: number,
        matchType: number,
        orderBy: number,
        leagueIds: Array<number>
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/match/matchResultPage', params)
    }


    async matchResultInfo(params: {
        languageType: string,
        matchId: number,
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/match/matchResultInfo', params)
    }
}