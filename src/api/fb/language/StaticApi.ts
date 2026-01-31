import { FBNotAuthBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/fbModel"

export class LanguageStaticApi {
    async list(params: { languageType: string } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/list', params)
    }
}