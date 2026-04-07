import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderSingleApi {
    public bet(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/virtual/v1/order/single/bet', params, req)
    }
}