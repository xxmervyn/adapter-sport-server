import { HonoRequest } from "hono";
import { FbServiceEntry } from "../../entry/service/fbServiceEntry";

export class V1BulletinApi {
    public listTop(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/bulletin/listTop', params, req)
    }
    
    public listPage(params: any, req: HonoRequest) {
        return FbServiceEntry.request('/v1/bulletin/listPage', params, req)
    }
}