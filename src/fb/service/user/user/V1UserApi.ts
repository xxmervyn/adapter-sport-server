import { HonoRequest } from "hono"
import { UserServiceEntry } from "../../entry/service/userServiceEntry"

export class V1UserApi {
    public async base(params: any, req: HonoRequest) {
        const data = await UserServiceEntry.request('/openPlayer/getPlayerInfoInner', params, req)
        if (data.code == 0) {
            const coin = (data.data.coin / 100).toFixed(2);
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
        return data
    }
}