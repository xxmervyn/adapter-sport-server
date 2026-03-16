import { any } from "zod/v4";
import { API_BASE_URL_ENUMS } from "../../../enums/apiBaseUrlEnum";
import { ApiRequestOptions, BaseApi } from "../../base/baseApi";
import { SERVER_ERR_CODE_ENUMS } from "../../../enums/serverErrCodeEnum";


class FBNotAuthBaseApiClass extends BaseApi {

    protected override async isValidatedRequest(req: Request): Promise<{ ecode: number, message: string }> {
        if (req.headers.get("Authorization") == "" || req.headers.get("Authorization") == "undefined") {
            req.headers.delete("Authorization")
            // return { ecode: SERVER_ERR_CODE_ENUMS.INVALID_TOKEN, message: "request later" }
        }

        return { ecode: SERVER_ERR_CODE_ENUMS.SUCCESS, message: "" }
    }

    protected override onFetchBefore(req: Request): Request {
        req.headers.set('Content-Type', 'application/json;charset=UTF-8')
        return req
    }

}

export const FBNotAuthBaseApi = new FBNotAuthBaseApiClass(
    {
        baseURL: API_BASE_URL_ENUMS.FB_BASE_HOST,
        timeout: 5000,
        retry: 1,
        retryDelay: 1000,
        headers: {}
    });