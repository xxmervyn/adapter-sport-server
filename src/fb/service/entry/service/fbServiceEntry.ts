import { FbCommApiResponse, TokenApiResponseData } from "../../../model/response/fbModel";
import { BaseService, ServiceLocalCacheInterface, ServiceRequestOptions } from "../../base/baseService";
import { SERVER_ERR_CODE_ENUMS } from "../../../enums/serverErrCodeEnum";
import { HonoRequest } from "hono";
import { UserBaseApi } from "../api/userApiEntry";
import { FBNotAuthBaseApi } from "../api/fbApiEntry";
import { API_BASE_URL_ENUMS } from "../../../enums/apiBaseUrlEnum";
import { ApiRequestOptions } from "../../base/baseApi";
import XXH from "xxhashjs";

class FBHeaderGenerator {
    private randomHeaders: HeadersInit[] = []

    constructor() {
        this.initRandomHeaders()
    }

    /* ================= 初始化 Header 池 ================= */

    public initRandomHeaders() {
        this.randomHeaders = [

            /* ================= Chrome Windows ================= */

            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                'Sec-Ch-Ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
                'Sec-Ch-Ua-mobile': '?0',
                'Sec-Ch-Ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
                'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'Sec-Ch-Ua-mobile': '?1',
                'Sec-Ch-Ua-platform': '"iOS"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'Sec-Ch-Ua-mobile': '?0',
                'Sec-Ch-Ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Priority': 'u=1, i',
            },
            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Safari/605.1.15',
                'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'Sec-Ch-Ua-mobile': '?1',
                'Sec-Ch-Ua-platform': '"Android"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.119 Mobile Safari/537.36',
                'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                'Sec-Ch-Ua-mobile': '?1',
                'Sec-Ch-Ua-platform': '"Android"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
            },
            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
                'Sec-Ch-Ua': '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
                'Sec-Ch-Ua-mobile': '?0',
                'Sec-Ch-Ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site'
            }
        ]
    }


    /* ================= 获取随机 Header ================= */

    public async getHeaders(path: string, tkInfo: TokenApiResponseData): Promise<HeadersInit> {
        const index = path.length % this.randomHeaders.length;
        const header = this.randomHeaders[index];

        var headers: HeadersInit = {
            ...header,
            'Referer': tkInfo.serverInfo?.pcAddress ? `${tkInfo.serverInfo.pcAddress}/` : "",
            'Origin': tkInfo.serverInfo?.pcAddress ?? "",
            'Pragma': "no-cache",
            "Connection": "keep-alive",
            "Cache-Control": "no-cache",
        }

        if (tkInfo?.token) {
            headers["Authorization"] = tkInfo.token
        }

        return headers
    }

}

const FBHeaderGeneratorInstance = new FBHeaderGenerator()


class FBLocalCache implements ServiceLocalCacheInterface {
    private store = new Map<string, { value: any; expireAt: number; cacheTime: number }>();

    private lastCleanTime = 0;
    private readonly CLEAN_INTERVAL = 10000;
    private cleaning = false;

    constructor() {
    }

    /* ---------- Cache API ---------- */

    getItem<T>(key: string): { expireAt: number; data: T } | null {
        if (key == "") return null;
        this.tryCleanAsync();

        const item = this.store.get(key);
        if (!item) return null;

        // if (item.expireAt <= Date.now()) {
        //     this.store.delete(key);
        //     return null;
        // }

        return {
            expireAt: item.expireAt,
            data: item.value as T
        };
    }

    hasItem(key: string): boolean {
        return this.getItem(key) !== null;
    }

    setItem<T>(key: string, value: T, cacheTime: number = 0): void {
        this.store.set(key, {
            value: value,
            expireAt: Date.now() + cacheTime,
            cacheTime: cacheTime,
        });
    }

    deleteItem(key: string): boolean {
        return this.store.delete(key);
    }


    private tryCleanAsync() {
        const now = Date.now();
        if (now - this.lastCleanTime < this.CLEAN_INTERVAL) {
            return;
        }

        if (this.cleaning) {
            return;
        }

        this.cleaning = true;
        this.lastCleanTime = Date.now();

        queueMicrotask(() => {
            const now = Date.now();
            // var c = 0;
            for (const [k, v] of this.store) {
                if (now - v.expireAt > v.cacheTime * 30) {
                    this.store.delete(k);
                    // c++;
                }
            }

            // console.log("缓存清除时间:", this.lastCleanTime, "  清理数量:", c, "  剩余数量:", this.store.size);
            this.cleaning = false;
        });

    }

    clearTTLAll(): void {
        const now = Date.now();
        for (const [k, v] of this.store) {
            if (v.expireAt <= now) {
                this.store.delete(k);
            }
        }
    }

    /* ---------- Request Key ---------- */

    async getRequestKey(requestKey: string, params: any): Promise<string> {
        const body = requestKey + JSON.stringify(params)
        // const key = await sha256(body) ?? "";
        const key = XXH.h32(body, 0xABCD).toString(16);
        return key;
    }

}

class FbServiceClass extends BaseService {

    public async requestNotCache(path: string, params: any, req: HonoRequest, defCache?: any): Promise<FbCommApiResponse> {
        return this.requestWithOptions(path, params, req, { cache: { isCache: false } }, defCache);
    }

    public async request(path: string, params: any, req: HonoRequest, defCache?: any, apiOptions?: ApiRequestOptions): Promise<FbCommApiResponse> {
        return this.requestWithOptions(path, params, req, { cache: { isCache: true } }, defCache, apiOptions);
    }

    public async requestWithOptions(path: string, params: any, req: HonoRequest, serviceOptions: ServiceRequestOptions, defCache?: any, apiOptions?: ApiRequestOptions): Promise<FbCommApiResponse> {
        const tkInfo = await this.getTokenInfoByReq(req)
        const headers = await FBHeaderGeneratorInstance.getHeaders(path, tkInfo)


        var region = ""
        var gameField = ""
        var xfrontpage = req.header("X-Front-Page") ?? "";
        var apihost = ""
        if (xfrontpage != "") {
            const xfpUrl = new URLSearchParams(xfrontpage)
            region = xfpUrl.get("hbr") ?? "";
            gameField = xfpUrl.get("hbgf") ?? "";
            params["__r"] = region;
            params["__gf"] = gameField;
            apihost = xfpUrl.get("hbapihost") ?? "";
        }

        if (tkInfo.token == "") {
            params["__r"] = "-100"
            params["__gf"] == "-100";
        }

        var option = { headers: headers, baseURL: tkInfo.serverInfo?.apiServerAddress, ...apiOptions }
        if (path.startsWith("/virtual")) {
            option = { headers: headers, baseURL: tkInfo.serverInfo?.virtualAddress, ...apiOptions }
        }
        if (apihost != "") {
            apihost = decodeURIComponent(apihost);
            option.baseURL = apihost;
        }

        const requestKey = `${option.baseURL}${path}-${tkInfo.token && tkInfo.token != "" ? "1" : "0"}`

        const result = await this.api<FbCommApiResponse>(requestKey, params, () => FBNotAuthBaseApi.post(path, params, option), serviceOptions)
        if (defCache && result.eCode == SERVER_ERR_CODE_ENUMS.REQUEST_CACHING) {
            return defCache
        }

        if (result.code == 14010 || result.code == 14108) {
            // 修改结果  14010防止用户被踢出  14108网络异常
            result.success = true
            result.code = 0
        }

        return result;
    }

    public async innerRequest(path: string, params: any, req: HonoRequest, defCache?: any): Promise<FbCommApiResponse> {
        var xFrontPage = req.header("X-Front-Page")
        var authorization = req.header("Authorization")
        const headers: HeadersInit = {}
        if (authorization && xFrontPage) {
            headers["X-Token"] = authorization
            headers["X-Front-Page"] = xFrontPage
        }

        if (authorization == null || authorization == "") {
            return {
                "code": 14010,
                "message": "賬號已登出，請重新登錄",
                "success": false
            }
        }


        var option = { headers: headers, baseURL: this.getInnerHost(req) }
        const result = await this.api<FbCommApiResponse>(path, params, () => UserBaseApi.post(path, params, option), { cache: { isCache: false } })
        if (defCache && result.eCode == SERVER_ERR_CODE_ENUMS.REQUEST_CACHING) {
            return defCache
        }
        return result;
    }

    public getInnerHost(req: HonoRequest): string {
        const url = new URL(req.url)
        var host = url.hostname.replaceAll("-h5", "")
        if (host.includes("-api") == false) {
            var hostArr = host.split(".");
            hostArr[0] = `${hostArr[0]}-api`
            host = hostArr.join(".")
        }
        let innerHost = `https://inner2${host}`;
        return innerHost;
    }

    public async getTokenInfoByReq(req: HonoRequest): Promise<TokenApiResponseData> {
        var xfrontpage = req.header("X-Front-Page") ?? "";
        var authorization = req.header("Authorization") ?? "";
        return this.getTokenInfo(req, xfrontpage, authorization);
    }

    public async getTokenInfo(req: HonoRequest, xfrontpage: string, authorization: string): Promise<TokenApiResponseData> {
        if (xfrontpage != "" && authorization != "") {
            const headers: HeadersInit = {}
            headers["X-Token"] = authorization
            headers["X-Front-Page"] = xfrontpage
            var result = await this.tokenApi(req, {}, headers)
            if (result.code == 14010) {
                //被踢出重新登入
                result = await this.tokenApi(req, { "needReset": true }, headers)
            }

            if (result.code == 0) {
                return result.data as TokenApiResponseData
            }
        }

        // 返回游客token
        return {
            token: "",
            serverInfo: {
                apiEmbeddedServerAddress: '',
                apiServerAddress: API_BASE_URL_ENUMS.FB_GUEST_BASE_HOST,
                pcAddress: API_BASE_URL_ENUMS.FB_GUEST_PC_BASE_HOST,
                pushServerAddress: API_BASE_URL_ENUMS.FB_GUEST_PUSH_SERVER_ADDRESS,
                virtualAddress: API_BASE_URL_ENUMS.FB_GUEST_VIRTUAL_BASE_HOST,
                ouPcAddress: '',
                h5Address: ''
            }
        } as TokenApiResponseData
    }

    private async tokenApi(req: HonoRequest, params: {}, headers: HeadersInit): Promise<FbCommApiResponse> {
        return await UserBaseApi.post<FbCommApiResponse>("/openPlayer/getFbPlayerInfoToken", params, { headers, baseURL: this.getInnerHost(req) })
    }

}

export const FbServiceEntry = new FbServiceClass({
    localCacheDefConf: {
        isCache: true,
        cacheTime: 1_000 // 1 秒（毫秒）
    },
    localCache: new FBLocalCache()
});
