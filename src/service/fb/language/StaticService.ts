import { BaseServiceOptions, FbNotAuthService } from "../../base/baseService"
import { FbCommApiResponse } from "../../../model/response/fbModel"
import { HonoRequest } from "hono"
import { FbApi } from "../../../api/fb/fbApi"

export class LanguageStaticService {
    async list(req: HonoRequest) {
        return await FbNotAuthService.api<FbCommApiResponse>(
            req,
            () => { return FbApi.LanguageStaticApi.list(req.json()) },
            { cache: { isCache: true, cacheTime: 1000 } }
        )
    }
}