import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class VirtualV1StatApi {
    public getByMatchId(params: any) {
        return FbServiceEntry.virtualRequest('/virtual/v1/stat/getByMatchId', params)
    }
}