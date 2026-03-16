import { HonoRequest } from "hono"
import { UserServiceEntry } from "../../entry/service/userServiceEntry"
import { SERVER_ERR_CODE_ENUMS } from "../../../enums/serverErrCodeEnum";

export class V1UserApi {
    public async base(params: any, req: HonoRequest) {
        const data = await UserServiceEntry.request('/openPlayer/getPlayerInfoInner', params, req)
        if (data.code == 0) {
            const coin = (data.data.coin / 10000).toFixed(2);
            const resp = {
                "success": true,
                "data": {
                    "currencyId": 1,
                    "uid": data.data.ID,
                    "bl": coin,
                    "cbs": [
                        {
                            "bl": coin,
                            "cid": 1
                        }
                    ]
                },
                "code": 0
            }
            return resp
        }
        if (data.code == SERVER_ERR_CODE_ENUMS.INVALID_TOKEN) {
            data.code = 0;
            data.success = true;
        }
        return data
    }
}