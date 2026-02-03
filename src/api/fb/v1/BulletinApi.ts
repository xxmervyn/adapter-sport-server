import { FBNotAuthBaseApi } from "../../base/baseApi"
import { FbCommApiResponse } from "../../../model/fbModel"

export class V1BulletinApi {
    async listTop(params: { languageType: string } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/bulletin/listTop', params)
    }


    async listPage(params: {
        languageType: string,
        current: number,
        size: number,
        sportId: number
    } | any) {
        return await FBNotAuthBaseApi.post<FbCommApiResponse>('/v1/bulletin/listPage', params)
    }
}