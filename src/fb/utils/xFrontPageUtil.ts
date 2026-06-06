import { HonoRequest } from "hono"

export type XFrontPageParams = Record<string, string>

export class XFrontPageUtil {
    public static getParamsFromReq(req: HonoRequest): XFrontPageParams {
        const xfrontpage = req.header("X-Front-Page") ?? ""
        return this.parse(xfrontpage)
    }

    public static parse(xfrontpage: string): XFrontPageParams {
        if (xfrontpage == "") {
            return {}
        }

        const xfpUrl = new URLSearchParams(xfrontpage)
        const params: XFrontPageParams = {}
        xfpUrl.forEach((value, key) => {
            params[key] = value
        })
        return params
    }
}
