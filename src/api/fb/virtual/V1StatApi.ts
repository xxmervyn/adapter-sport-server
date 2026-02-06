import { FBNotAuthBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/response/fbModel"

export class VirtualV1StatApi {
    async getByMatchId(params: {
        languageType: string,
        matchId: number,
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/virtual/v1/stat/getByMatchId', params)
    }
}