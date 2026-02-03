import { FBNotAuthBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/fbModel"

export class VirtualV1MatchApi {
    async getMatchListWithResults(params: {
        sportId: string,
        beginTime: number,
        endTime: number,
        languageType: string,
        current: number,
        size: number,
        orderBy: number,
        leagueIds: Array<any>
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/virtual/v1/match/getMatchListWithResults', params)
    }


    async statistical(params: {
        languageType: string,
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/virtual/v1/match/statistical', params)
    }


    async getList(params: {
        languageType: string,
        oddsType: number,
        isPC: boolean,
        leagueId: number,
        blockId: string,
        blobkSize: number,
        existLive: boolean,
        time: number
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/virtual/v1/match/getList', params)
    }


    async getMatchDetail(params: {
        languageType: string,
        oddsType: number,
        matchId: number
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/virtual/v1/match/getMatchDetail', params)
    }
}