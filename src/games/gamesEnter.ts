import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../types";
import { z } from "zod";
import { MD5 } from "crypto-js";
import { HonoRequest } from "hono/request";
import { LANGUAGE_MAP } from "../fb/enums";
import { UserService } from "../fb/service/userService";

export class GamesEnterEndpoint extends OpenAPIRoute {
	public schema = {
		tags: ["GamesEnter"],
		summary: "Gaems Enter And Login",
		operationId: "Gaems Enter And Login",
		request: {
			query: z.object({
				lang: z.string(),
				id: z.string(),
				playerGameToken: z.string().optional(),
				reqt: z.string(),
				esign: z.string(),
				ui: z.string().optional(),
				apihost: z.string().optional(),
			}),
			body: contentJson(z.object({ name: z.string() })),
		}
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		const req = c.req;

		const urlObj = new URL(req.url);
		const hostname = urlObj.hostname;
		const apiHost = hostname.replace(".", "-api.");

		const token = data.query.playerGameToken ?? "guestMode";
		const jwtInfo = decodeJWT(token);

		const lang = LANGUAGE_MAP[data.query.lang?.toLowerCase() || "en"] || "ENG";
		const ui = data.query.ui;

		let url = this.buildGameUrl(req, token, jwtInfo, hostname, apiHost, lang, ui);
		url = genGameUrlSignWithKeys(data.query, url, ["token"], true);

		if (token === "guestMode") {
			const tokenInfo = await UserService.V1User.token(req, "", "");
			url = this.appendPlatformParams(url, tokenInfo, "&r=55555");
		} else {
			const extraParam = data.query.apihost ? `&hbinnerapihost=${encodeURIComponent(data.query.apihost)}` : "";
			const signUrl = `https://${hostname}?token=${token}`;
			const xFrontPage = genGameUrlSignWithKeys(data.query, signUrl, ["token"], true) + extraParam;

			const tokenInfo = await UserService.V1User.token(req, xFrontPage, token);
			if (!tokenInfo.token) {
				return { code: 14010, message: "賬號已登出，請重新登錄", success: false };
			}

			const userInfo = await UserService.V1User.userInfo(req, xFrontPage, token);
			if (userInfo.code !== 0) {
				return { code: 14010, message: "賬號已登出，請重新登錄2", success: false };
			}

			url = this.appendPlatformParams(url, tokenInfo, `&hbr=${userInfo.data?.region}&hbgf=${jwtInfo?.GameField}${extraParam}`);
		}

		if (ui) url += `&ui=${ui}`;

		return c.redirect(url);
	}

	private buildGameUrl(req: HonoRequest, token: string, jwtInfo: any, hostname: string, apiHost: string, lang: string, ui?: string) {
		const isH5 = ui === "h5" || isMobileRequest(req);

		const themeText = encodeURIComponent(JSON.stringify({
			h5FgColor: "#4C6FFF",
			pcFgColor: "#4C6FFF",
			pcThemeCustomFgColor: "#4C6FFF"
		}));

		const themeBg = "05259D";

		if (isH5) {
			const h5Host = this.buildH5Host(hostname);

			return `https://${h5Host}/index.html#/?token=${token}&pcAddress=${h5Host}` +
				`&virtualSrc=https://${apiHost}&apiSrc=https://${apiHost}` +
				`&themeBg=${themeBg}&themeText=${themeText}` +
				`&nickname=${jwtInfo?.UserName}&controlMenu=2&language=${lang}`;
		}

		return `https://${hostname}/index.html#/?token=${token}&nickname=${jwtInfo?.UserName}` +
			`&pcAddress=https://${hostname}&virtualSrc=https://${apiHost}` +
			`&apiSrc=https://${apiHost}&icoUrl=https://${hostname}/favicon.ico` +
			`&handicap=1&themeBg=${themeBg}&themeText=${themeText}` +
			`&controlMenu=2&language=${lang}`;
	}

	private buildH5Host(hostname: string) {
		const arr = hostname.split(".");
		arr[0] = `${arr[0]}-h5`;
		return arr.join(".");
	}

	private appendPlatformParams(url: string, tokenInfo: any, extra?: string) {
		return url +
			`&pushSrc=${tokenInfo.serverInfo.pushServerAddress}` +
			`&one=1&platformName=HBSPORTS` +
			`&tk=${tokenInfo.token}` +
			(extra || "");
	}
}

function genGameUrlSignWithKeys(reqParams: any, url: string, keys: string[] | null, changeJinhan: boolean): string {
	const reqTime = reqParams["reqt"] ?? Math.floor(Date.now() / 1000).toString();
	url = `${url}&reqt=${reqTime}`;

	let fullHref = "";
	let resTag = "";

	if (!keys || keys.length === 0) {
		fullHref = url + "&jO8nH7sK2sK9sF4p";
	} else {
		let urlQuery = changeJinhan ? url.replace(/#/g, "&") : url;
		const urlDetail = new URL(urlQuery);
		const query = urlDetail.searchParams;

		fullHref = urlDetail.hostname + "&" + (query.get("reqt") ?? "");
		resTag = "k_";

		for (const key of keys) {
			const value = query.get(key) ?? "";
			fullHref += "&" + value;
			resTag += key + "_";
		}

		fullHref += "&jO8nH7sK2sK9sF4p";
	}

	const md5 = MD5(fullHref).toString();
	const res = md5.substring(0, 12);

	return url + "&esign=" + resTag + res;
}

function decodeJWT(token: string) {
	if (token === "guestMode") return { UserName: "guestMode" };

	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

	return JSON.parse(jsonPayload);
}

function isMobileRequest(req: HonoRequest) {
	const urlReq = new URL(req.url);
	const platform = urlReq.searchParams.get("platform");
	if (platform === "h5" || platform === "mobile") return true;

	let ua = req.header("user-agent") || "";
	ua = ua.toLowerCase();

	return /ipad|mobile|android|iphone|ipod/.test(ua);
}