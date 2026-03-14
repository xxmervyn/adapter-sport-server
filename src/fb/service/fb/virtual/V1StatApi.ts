import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class VirtualV1StatApi {
    public getByMatchId(params: any) {
        return FbServiceEntry.request('/virtual/v1/stat/getByMatchId', params)
    }
}