import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../types";
import { z } from "zod";
import { MD5 } from "crypto-js";
import { HonoRequest } from "hono";
import { tr, ur } from "zod/v4/locales";
import { LANGUAGE_MAP } from "../fb/enums";
import { UserService } from "../fb/service/userService";
import { API_BASE_URL_ENUMS } from "../fb/enums/apiBaseUrlEnum";



export class GamesEnterEndpoint extends OpenAPIRoute {
	public schema = {
		tags: ["GamesEnter"],
		summary: "Gaems Enter And Login",
		operationId: "Gaems Enter And Login", // This is optional
		request: {
			query: z.object({
				lang: z.string(),
				id: z.string(),
				playerGameToken: z.string().optional(),
				reqt: z.string(),
				esign: z.string(),
				ui: z.string().optional()
			}),
			body: contentJson(
				z.object({
					name: z.string(),
				}),
			),
		}
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();

		const urlReq = new URL(c.req.url);
		const apiHostName = urlReq?.hostname.replace(".", "-api.");

		if (data.query.playerGameToken == null) {
			data.query.playerGameToken = "guestMode"
		}

		const info = decodeJWT(data.query.playerGameToken)
		var lang = "ENG";
		lang = LANGUAGE_MAP[data.query.lang?.toLowerCase() || "en"]

		const themeText = encodeURIComponent(JSON.stringify({ h5FgColor: "#17856F", pcFgColor: "#17856F", pcThemeCustomFgColor: "#4C6FFF" }))
		const ui = data.query?.ui

		var url = ""
		if (ui == "h5" || isMobileRequest(c.req)) {
			var hostName = `${urlReq?.hostname}`;
			var hostArr = hostName.split(".");
			hostArr[0] = `${hostArr[0]}-h5`
			hostName = hostArr.join(".")
			url = `https://${hostName}/index.html#/?token=${data.query.playerGameToken}&pcAddress=${hostName}&virtualSrc=https://${apiHostName}&apiSrc=https://${apiHostName}&themeBg=4C6FFF` +
				`&themeText=${themeText}&controlMenu=2&language=${lang}&one=1`
		} else {
			url = `https://${urlReq?.hostname}/index.html#/?token=${data.query.playerGameToken}&nickname=${info?.UserName}&` +
				`pcAddress=https://${urlReq?.hostname}&virtualSrc=https://${apiHostName}&apiSrc=https://${apiHostName}&platformName=FB体育&icoUrl=https://${urlReq?.hostname}/favicon.ico&` +
				`handicap=1&themeBg=4C6FFF&themeText=${themeText}&controlMenu=2&language=${lang}`
		}

		url = genGameUrlSignWithKeys(data.query, url, ["token"], true)

		if (data.query.playerGameToken == "guestMode") {
			const tokenInfo = await UserService.V1User.token(c.req, "", "")
			url = `${url}&pushSrc=${tokenInfo.serverInfo.pushServerAddress}&one=1&tk=${tokenInfo.token}`
		} else {
			const sginUrl = `https://${urlReq?.hostname}?token=${data.query.playerGameToken}`
			var xfontpage = genGameUrlSignWithKeys(data.query, sginUrl, ["token"], true)
			const tokenInfo = await UserService.V1User.token(c.req, xfontpage, data.query.playerGameToken)
			if (tokenInfo.token == "") {
				return {
					"code": 14010,
					"message": "賬號已登出，請重新登錄",
					"success": false
				}
			}
			url = `${url}&pushSrc=${tokenInfo.serverInfo.pushServerAddress ?? "wss://push.5890v.com"}&one=1&tk=${tokenInfo.token}`
		}

		if (ui) {
			url = `${url}&ui=${ui}`
		}


		return c.redirect(url)
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

		let urlQuery = url;

		if (changeJinhan) {
			urlQuery = urlQuery.replace(/#/g, "&");
		}

		const urlDetail = new URL(urlQuery);
		const query = urlDetail.searchParams;

		fullHref = urlDetail.hostname + "&" + (query.get("reqt") ?? "");

		resTag = "k_";

		for (const key of keys) {

			const value = query.get(key) ?? "";

			fullHref = fullHref + "&" + value;
			resTag = resTag + key + "_";
		}

		fullHref = fullHref + "&jO8nH7sK2sK9sF4p";
	}

	const md5 = MD5(fullHref).toString()
	const res = md5.substring(0, 12);

	url = url + "&esign=" + resTag + res;

	return url;
}


function decodeJWT(token: string) {
	if (token == "guestMode") {
		return { UserName: "guestMode" }
	}

	const base64Url = token.split('.')[1]; // 获取 payload 部分
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

function isMobileRequest(req: HonoRequest) {
	const urlReq = new URL(req.url);
	const platform = urlReq.searchParams.get("platform");
	if (platform == "h5" || platform == "mobile") {
		return true;
	}

	var ua = req.header("user-agent") || "";
	ua = ua.toLowerCase();

	if (/ipad|mobile|android|iphone|ipod/.test(ua)) return true;
	return false;
}