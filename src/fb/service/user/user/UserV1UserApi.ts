import { HonoRequest } from "hono"
import { SERVER_ERR_CODE_ENUMS } from "../../../enums/serverErrCodeEnum";
import { FbServiceEntry } from "../../entry/service/fbServiceEntry";
import { CURRENCY_MAP } from "../../../enums";


export class V1UserApi {
    public async base(params: any, req: HonoRequest) {
        const data = await FbServiceEntry.innerRequest('/openPlayer/getPlayerInfoInner', params, req)
        if (data.code == 0) {
            var currencyId = CURRENCY_MAP[data.data.currency ?? "USD"]
            const coin = (data.data.coin / 10000).toFixed(2);
            const resp = {
                "success": true,
                "data": {
                    "currencyId": currencyId,
                    "uid": data.data.ID,
                    "bl": coin,
                    "cbs": [
                        {
                            "bl": coin,
                            "cid": currencyId
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