import { FBNotAuthBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/response/fbModel"

export class V1MerchantApi {
    async detail(params: {languageType: string} | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/merchant/detail', params)
    }
}