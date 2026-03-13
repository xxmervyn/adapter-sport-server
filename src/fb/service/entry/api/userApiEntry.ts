import { API_BASE_URL_ENUMS } from "../../../enums/apiBaseUrlEnum";
import { BaseApi } from "../../base/baseApi";

class FBForwardBaseApiClass extends BaseApi {
    protected override async isValidatedRequest(req: Request): Promise<{ success: boolean, resp: any }> {
        let refererStr = req.headers.get("x-front-page");

        if (refererStr == null || refererStr == "" || refererStr.indexOf("&esign=") < 0) {
            refererStr = req.url;
        }

        refererStr = decodeURIComponent(refererStr);
        // if (config.NeedChangeJinhao == true) {
        //     refererStr = refererStr.replaceAll("#", "&");
        // }
        refererStr = refererStr.replaceAll("#", "&");

        // console.log("CheckRefrenceEsign", refererStr);
        let refererUrl = new URL(refererStr);
        let esign = refererUrl.searchParams.get("esign") ?? "";
        let reqt = refererUrl.searchParams.get("reqt") ?? "";
        if (esign == "" || reqt == "") {
            // console.warn("主链接未签名", refererStr);
            return { success: false, resp: {} }
        }

        let reqtBase = reqt;
        if (reqt.indexOf("l_") == 0) {
            reqt = reqt.substring(reqt.indexOf("endl_") + 5);
        }

        // console.log("esign:", esign, "regt:", reqt);
        if (Math.abs(parseInt(reqt) - (new Date()).getTime() / 1000) > 86400) {
            // console.warn("主链接已过有效期", refererStr);
            return { success: false, resp: {} };
        }

        let signStrVec = refererStr.split("&esign=");
        if (signStrVec.length != 2) {
            // console.warn("主链接没有签名:", refererStr);
            return { success: false, resp: {} };
        }

        let signStr = "";
        if (esign.indexOf("k_") == 0) {
            let esignVec = esign.split("_");
            let resTag = "k_";
            let srcStr = refererUrl.hostname + "&" + reqtBase;
            for (let i = 1; i < esignVec.length - 1; i++) {
                srcStr = srcStr + "&" + refererUrl.searchParams.get(esignVec[i]);
                resTag = resTag + esignVec[i] + "_";
            }
            // console.log("srcStr",srcStr);
            signStr = await this.computeMD5(srcStr + "&jO8nH7sK2sK9sF4p");
            signStr = signStr.substring(0, 12);
            signStr = resTag + signStr;
            // console.log("signStr",signStr);
        } else {
            signStr = await this.computeMD5(signStrVec[0] + "&jO8nH7sK2sK9sF4p");
            signStr = signStr.substring(0, 12);
        }

        if (signStr != esign) {
            // console.warn("主链接签名错误:", refererStr);
            return { success: false, resp: {} };
        }

        return { success: true, resp: {} };
    }

    protected override fetch(req: Request): Promise<Response> {
        // if (env.INNER_FETCH != null) {
        //     return env.INNER_FETCH.fetch(req);
        // }
        return fetch(req);
    }

    private async computeMD5(message: string): Promise<string> {
        // 使用WebCrypto API计算MD5哈希
        const msgBuffer = new TextEncoder().encode(message); // 将字符串转换为ArrayBuffer
        const hashBuffer = await crypto.subtle.digest('MD5', msgBuffer); // 计算MD5哈希
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // 将ArrayBuffer转换为Uint8Array，然后转换为数字数组
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // 将数字转换为十六进制字符串
        return hashHex;
    }
}



export const FBForwardBaseApi = new FBForwardBaseApiClass(
    {
        baseURL: API_BASE_URL_ENUMS.FORWARD_COM,
        timeout: 5000,
        retry: 1,
        retryDelay: 1000,
        headers: {}
    });
