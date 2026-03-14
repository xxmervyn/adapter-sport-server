import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1OrderOddsCartApi {
    public refresh(params: any) {
        return FbServiceEntry.virtualRequest('/virtual/v1/order/odds/cart/refresh', params)
    }
}