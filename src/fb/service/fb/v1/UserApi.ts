import { FbServiceEntry } from "../../entry/fbServiceEntry"

export class V1UserApi {
    public accessCheck(params: any) {
        return FbServiceEntry.request('/v1/user/accessCheck', params)
    }
}
