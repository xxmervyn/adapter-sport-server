import { FBNotAuthBaseApi, ApiRequestOptions } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/response/fbModel"

export class LanguageStaticApi {

    public async list(params: { languageType: string } | any, options?: ApiRequestOptions) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/language/static/list', params, options)
    }
    
}