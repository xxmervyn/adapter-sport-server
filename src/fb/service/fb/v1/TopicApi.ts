import { HonoRequest } from "hono"
import { FbServiceEntry } from "../../entry/service/fbServiceEntry"

export class V1TopicApi {

    public matchList(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/topic/matchList', params, req)
    }

    public playerStatList(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/topic/playerStatList', params, req)
    }
    
    public teamStatList(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/topic/teamStatList', params, req)
    }

}