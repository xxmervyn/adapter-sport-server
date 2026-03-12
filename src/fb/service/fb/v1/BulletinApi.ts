import { FbServiceEntry } from "../../entry/fbServiceEntry";

export class V1BulletinApi {
    public listTop(params: any) {
        return FbServiceEntry.request('/v1/bulletin/listTop', params)
    }
    
    public listPage(params: any) {
        return FbServiceEntry.request('/v1/bulletin/listPage', params)
    }
}