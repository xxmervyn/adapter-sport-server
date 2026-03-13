import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class LanguageStaticApi {
    public list(params: any) {
        return FbServiceEntry.request('/language/static/list', params)
    }
}