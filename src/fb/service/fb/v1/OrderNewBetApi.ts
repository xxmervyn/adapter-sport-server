import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderNewBetApi {
    public list(params: any) {
        return FbServiceEntry.request('/v1/order/new/bet/list', params)
    }

}