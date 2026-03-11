import { BaseServiceOptions, FbUserService } from "../../base/baseService"
import { FbCommApiResponse } from "../../../model/response/fbModel"
import { HonoRequest } from "hono"
import { FbApi } from "../../../api/fb/fbApi"

export class UserService {
    async getUsertInfo(req: HonoRequest, data:any) {
        return await FbUserService.api<FbCommApiResponse>(
            req,
            () => { return FbApi.V1UserApi.getUsertInfo(data) },
            { cache: { isCache: true, cacheTime: 1000 } }
        )
    }
}