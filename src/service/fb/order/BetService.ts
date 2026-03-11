import { BaseServiceOptions, FbUserService } from "../../base/baseService"
import { FbCommApiResponse } from "../../../model/response/fbModel"
import { HonoRequest } from "hono"
import { FbApi } from "../../../api/fb/fbApi"

export class BetService {
    async betList(req: HonoRequest, data:any) {
        return await FbUserService.api<FbCommApiResponse>(
            req,
            () => { return FbApi.V1OrderApi.newBetList(data) },
            { cache: { isCache: true, cacheTime: 1000 } }
        )
    }

    async betchBetList(req: HonoRequest, data:any) {
        return await FbUserService.api<FbCommApiResponse>(
            req,
            () => { return FbApi.V1OrderApi.batchBetList(data) },
            { cache: { isCache: true, cacheTime: 1000 } }
        )
    }
}