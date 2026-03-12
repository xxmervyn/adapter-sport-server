import { FBNotAuthBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/response/fbModel"
import { FbServiceEntry } from "../../entry/fbServiceEntry"

export class V1SportRuleApi {
    public list(params: any) {
        return FbServiceEntry.request('/v1/sportRule/list', params)
    }
}