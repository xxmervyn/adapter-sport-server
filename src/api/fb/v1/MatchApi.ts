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

}