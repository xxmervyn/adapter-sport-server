import { FbServiceEntry } from "../../entry/fbServiceEntry"

export class V1MerchantApi {
    public detail(params: any) {
        return FbServiceEntry.request('/v1/merchant/detail', params)
    }
}