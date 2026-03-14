import { any } from "zod/v4";
import { API_BASE_URL_ENUMS } from "../../../enums/apiBaseUrlEnum";
import { ApiRequestOptions, BaseApi } from "../../base/baseApi";

interface LoginInfo {
    userName: string,
    userPassword: string,
    token: string,
    serverInfo: {
        apiServerAddress: string
        apiEmbeddedServerAddress: string
        pushServerAddress: string
        pcAddress: string
        h5Address: string
        virtualAddress: string
        virtualMatchVideoAddress: string
        ouH5Address: string
        ouPcAddress: string
    },
    expire: number,
    status: number,
}

class FBHeaderGenerator {
    private randomHeaders: HeadersInit[] = []
    private accountList: LoginInfo[] = []

    constructor() {
        this.initRandomHeaders()
        this.initAccountList()
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
                'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
                'Sec-Ch-Ua-mobile': '?0',
                'Sec-Ch-Ua-platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site'
            }
        ]
    }

    public initAccountList() {
        this.accountList = [
            {
                userName: "t013",
                userPassword: "546071",
                token: "",
                serverInfo: {
                    apiServerAddress: "",
                    apiEmbeddedServerAddress: "",
                    pushServerAddress: "",
                    pcAddress: "",
                    h5Address: "",
                    virtualAddress: "",
                    virtualMatchVideoAddress: "",
                    ouH5Address: "",
                    ouPcAddress: "",
                },
                expire: 0,
                status: 0,
            },
            // {
            //     userName: "t012",
            //     userPassword: "441896",
            //     token: "",
            //     serverInfo: {
            //         apiServerAddress: "",
            //         apiEmbeddedServerAddress: "",
            //         pushServerAddress: "",
            //         pcAddress: "",
            //         h5Address: "",
            //         virtualAddress: "",
            //         virtualMatchVideoAddress: "",
            //         ouH5Address: "",
            //         ouPcAddress: "",
            //     },
            //     expire: 0,
            //     status: 0,
            // }
        ]
    }

    /* ================= 获取随机 Header ================= */

    public async getHeaders(path: string): Promise<HeadersInit> {
        const info = await this.getInfo(path);
        const index = info.expire % this.randomHeaders.length;
        const header = this.randomHeaders[index]

        return {
            ...header,
            'Authorization': `${info.token}`
        }
    }

    public async getToken(path: string): Promise<string> {
        return (await this.getInfo(path))?.token ?? ""
    }

    public async getInfo(path: string): Promise<LoginInfo> {
        const i = this.getAccountIndex(path);
        const info = this.accountList[i]
        if (info.status == 1 && info.token != "" && Date.now() < info.expire) {
            return info
        }
        if (info.status == 2) {
            return { token: info.token } as LoginInfo
        }
        info.status = 2
        this.accountList[i] = await this.refreshInfo(path)
        info.status = 1

        return this.accountList[i]
    }

    private getAccountIndex(path: string): number {
        return path.length % this.accountList.length
    }

    public async refreshInfo(path: string): Promise<LoginInfo> {
        const i = this.getAccountIndex(path);
        const info = this.accountList[i]

        const headers = {
            "content-type": "application/x-www-form-urlencoded",
        }

        let resp: any = await fetch(
            "https://client.server.newsportspro.com/clientServer/user/log",
            {
                method: "POST",
                headers,
                body: new URLSearchParams({
                    userName: "t013",
                    userPassword: "546071"
                })
            }
        ).then(res => res.json())

        if (!resp?.success || !resp?.data?.token) {
            return {} as LoginInfo
        }

        const token = resp.data.token
        const userId = resp.data.userId

        resp = await fetch(
            "https://client.server.newsportspro.com/clientServer/user/jump/newSports",
            {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    token,
                    userid: userId
                },
                body: new URLSearchParams({
                    userId: userId,
                    platForm: "pc"
                })
            }
        ).then(r => r.json())

        if (!resp?.success || !resp?.data?.token) {
            return {} as LoginInfo
        }

        info.expire = Date.now() + 10 * 60 * 1000 // 10分钟
        info.token = resp.data.token
        info.serverInfo = resp.data.serverInfo


        // resp = await fetch(
        //     "https://api.u7f3z.com/v1/user/accessCheck",
        //     {
        //         method: "POST",
        //         headers: {
        //             "authorization": info.token
        //         },
        //         body: new URLSearchParams({
        //             "languageType": "ZHO",
        //             "version": "1"
        //         })
        //     }
        // ).then(r => r.json())

        return info
    }

    public async clearToken(path: string) {
        const i = this.getAccountIndex(path);
        const info = this.accountList[i]
        info.expire = 0
    }
}

class FBNotAuthBaseApiClass extends BaseApi {
    public fBHeaderGeneratorInstance = new FBHeaderGenerator()

    protected override async isValidatedRequest(req: Request): Promise<{ success: boolean, resp: any }> {
        if (req.headers.get("Authorization") == "undefined") {
            return { success: false, resp: { success: false, msg: "request later" } }
        }

        return { success: true, resp: {} }
    }

    // protected override async onGenAuthHeader(path: string): Promise<HeadersInit> {
    //     return this.fBHeaderGeneratorInstance.getHeaders(path)
    // }

    public async clearToken(path: string) {
        this.fBHeaderGeneratorInstance.clearToken(path)
    }


}

export const FBNotAuthBaseApi = new FBNotAuthBaseApiClass(
    {
        baseURL: API_BASE_URL_ENUMS.HTTPS_API_A233Z1_COM,
        timeout: 5000,
        retry: 1,
        retryDelay: 1000,
        headers: {}
    });