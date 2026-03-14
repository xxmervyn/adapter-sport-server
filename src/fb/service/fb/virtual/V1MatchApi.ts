import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class VirtualV1MatchApi {
    public getMatchListWithResults(params: any) {
        return FbServiceEntry.virtualRequest('/virtual/v1/match/getMatchListWithResults', params)
    }
    
    public statistical(params: any) {
        return FbServiceEntry.virtualRequest('/virtual/v1/match/statistical', params)
    }
    
    public getList(params: any) {
        return FbServiceEntry.virtualRequest('/virtual/v1/match/getList', params)
    }
    
    public getMatchDetail(params: any) {
        return FbServiceEntry.virtualRequest('/virtual/v1/match/getMatchDetail', params)
    }


}