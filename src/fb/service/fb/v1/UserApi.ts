import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1UserApi {
    public accessCheck(params: any) {
        return {
            "success": true,
            "data": false,
            "code": 0
        }
    }
}
