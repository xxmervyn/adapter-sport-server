import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"
import { XFrontPageUtil } from "../../../utils/xFrontPageUtil"

const VIRTUAL_SPORT_IDS = new Set([1001, 1020, 1021, 1022, 1023])

export class V1MerchantApi {
    public async detail(params: any, req: HonoRequest) {
        const data = await FbServiceEntry.requestNotCache('/v1/merchant/detail', params, req)
        const xFrontPageParams = XFrontPageUtil.getParamsFromReq(req)

        if (Object.prototype.hasOwnProperty.call(xFrontPageParams, "offvr")) {
            this.hideVirtualSports(data)
        }

        return data
    }

    private hideVirtualSports(data: any) {
        if (!Array.isArray(data?.data?.sss)) {
            return
        }

        data.data.sss = data.data.sss.filter((sportId: unknown) => !VIRTUAL_SPORT_IDS.has(Number(sportId)))
    }
}
