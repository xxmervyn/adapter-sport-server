import { API_BASE_URL_ENUMS } from "../../../enums/apiBaseUrlEnum";
import { BaseApi } from "../../base/baseApi";


class FBHeaderGenerator {
    private token: string = ""
    private expire = 0
    private refreshing?: Promise<string>
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
                'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Origin': "",
                'Referer': "",
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Connection': 'keep-alive',
                'Host': ""
            },

            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="143", "Google Chrome";v="143"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Origin': "",
                'Referer': 'https://www.bing.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Connection': 'keep-alive',
                'Host': ""
            },

            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="142", "Google Chrome";v="142"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Origin': "",
                'Referer': 'https://duckduckgo.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Connection': 'keep-alive',
                'Host': ""
            },

            /* ================= Edge ================= */

            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0',
                'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Origin': "",
                'Referer': 'https://www.microsoft.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Connection': 'keep-alive',
                'Host': ""
            },

            /* ================= Firefox ================= */

            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:139.0) Gecko/20100101 Firefox/139.0',
                'Origin': "",
                'Referer': "",
                'Connection': 'keep-alive',
                'Host': ""
            },

            /* ================= Chrome Mac ================= */

            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'Origin': "",
                'Referer': "",
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Connection': 'keep-alive',
                'Host': ""
            },

            /* ================= Chrome Linux ================= */

            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Linux"',
                'Origin': "",
                'Referer': "",
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Connection': 'keep-alive',
                'Host': ""
            },

            /* ================= Android Chrome ================= */

            {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json;charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36',
                'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Google Chrome";v="144"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'Origin': "",
                'Referer': "",
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'Connection': 'keep-alive',
                'Host': ""
            }

        ]
    }

    /* ================= 获取随机 Header ================= */

    public async getHeaders(): Promise<HeadersInit> {

        const token = await this.getToken()

        const header = this.randomHeaders[Math.floor(Math.random() * this.randomHeaders.length)]

        return {
            ...header,
            'Authorization': `Bearer ${token}`
        }
    }



    public async getToken(): Promise<string> {

        if (this.token && Date.now() < this.expire) {
            return this.token
        }

        if (this.refreshing) {
            return this.refreshing
        }

        this.refreshing = this.refreshToken()
        const token = await this.refreshing
        this.refreshing = undefined

        return token
    }

    private async refreshToken(): Promise<string> {

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
            return ""
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
                    userId,
                    platForm: "pc"
                })
            }
        ).then(r => r.json())

        if (!resp?.success || !resp?.data?.token) {
            return ""
        }

        this.token = resp.data.token
        this.expire = Date.now() + 5 * 60 * 1000 // 5分钟

        return this.token
    }

}

class FBNotAuthBaseApiClass extends BaseApi {
    private fBHeaderGeneratorInstance = new FBHeaderGenerator()

    protected override async getAuthorizationHeader(): Promise<HeadersInit> {
        return this.fBHeaderGeneratorInstance.getHeaders()
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