import { FBForwardBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/response/fbModel"

export class V1OrderApi {
    async newBetList(params: {
        languageType: string
    } | any) {
        return await FBForwardBaseApi.post<FbCommApiResponse>('/v1/order/new/bet/list', params)
    }

    async batchBetList(params: {
        languageType: string
    } | any) {
        return await FBForwardBaseApi.post<FbCommApiResponse>('/v1/order/batchBetMatchMarketOfJumpLine', params)
    }
}