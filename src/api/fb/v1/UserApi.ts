import { FBForwardBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/response/fbModel"

export class V1UserApi {
    async getUsertInfo(params: {
        languageType: string
    } | any) {
        return await FBForwardBaseApi.post<FbCommApiResponse>('/v1/user/base', params)
    }
}
