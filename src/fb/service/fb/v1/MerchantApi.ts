import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1MerchantApi {
    public detail(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/merchant/detail', params, req)
    }
}