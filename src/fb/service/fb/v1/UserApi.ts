import { SERVER_ERR_CODE_ENUMS } from "../../../enums/serverErrCodeEnum"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1UserApi {
    public accessCheck(params: any) {
        var data = FbServiceEntry.request('/v1/user/accessCheck', params) as any
        if (data?.code == SERVER_ERR_CODE_ENUMS.REQUEST_CACHING) {
            data = {
                "success": true,
                "data": false,
                "code": 0
            }
        }
        return data
    }
}
