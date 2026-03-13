import { HonoRequest } from "hono"
import { UserServiceEntry } from "../../entry/service/userServiceEntry"

export class V1UserApi {
    public base(params: any, req: HonoRequest) {
        return UserServiceEntry.request('/openPlayer/getPlayerInfoInner', params, req)
    }
}