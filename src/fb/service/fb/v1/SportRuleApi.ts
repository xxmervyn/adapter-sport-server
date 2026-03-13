import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1SportRuleApi {
    public list(params: any) {
        return FbServiceEntry.request('/v1/sportRule/list', params)
    }
}