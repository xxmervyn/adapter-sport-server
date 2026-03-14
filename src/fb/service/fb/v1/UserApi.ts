import { SERVER_ERR_CODE_ENUMS } from "../../../enums/serverErrCodeEnum"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1UserApi {
    public accessCheck(params: any) {
        return FbServiceEntry.request('/v1/user/accessCheck', params,{
            "success": true,
            "data": false,
            "code": 0
        })
    }
}
