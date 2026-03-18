import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../types";
import { z } from "zod";
import { MD5 } from "crypto-js";
import { HonoRequest } from "hono";
import { tr } from "zod/v4/locales";

const languageMap: Record<string, string> = {
	'en': 'ENG',
	'cmn': 'CMN',
	'zh': 'CMN',
	'zho': 'ZHO',
	'zh-tw': 'ZHO',
	'zh-hk': 'ZHO',
	'jpn': 'JPN',
	'ja': 'JPN',
	'kor': 'KOR',
	'ko': 'KOR',
	'spa': 'SPA',
	'es': 'SPA',
	'vie': 'VIE',
	'vi': 'VIE',
	'tha': 'THA',
	'th': 'THA',
	'msa': 'MSA',
	'ms': 'MSA',
	'in': 'IND',
	'id': 'IND',
	'hin': 'HIN',
	'hi': 'HIN',
	'sau': 'SAU',
	'ar': 'SAU',
	'deu': 'DEU',
	'de': 'DEU',
	'fra': 'FRA',
	'fr': 'FRA',
	'bra': 'BRA',
	'br': 'BRA',
	'pt': 'BRA',
	'rus': 'RUS',
	'ru': 'RUS',
	'tr': 'TR',
	'tur': 'TR'
};

export class GamesEnterEndpoint extends OpenAPIRoute {
	public schema = {
		tags: ["GamesEnter"],
		summary: "Gaems Enter And Login",
		operationId: "Gaems Enter And Login", // This is optional
		request: {
			query: z.object({
				lang: z.string(),
				id: z.string(),
				playerGameToken: z.string(),
				reqt: z.string(),
				esign: z.string(),
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

		const themeText = encodeURIComponent(JSON.stringify({
			h5FgColor: "#4C6FFF",
			pcFgColor: "#4C6FFF",
			pcThemeCustomFgColor: "#4C6FFF"
		}))

		const info = decodeJWT(data.query.playerGameToken)
		var lang = "ENG";
		lang = languageMap[data.query.lang?.toLowerCase() || "en"]
		var url = ""
		if (isMobileRequest(c.req)) {
			var hostName = `${urlReq?.hostname}`;
			var hostArr = hostName.split(".");
			hostArr[0] = `${hostArr[0]}-h5`
			hostName = hostArr.join(".")
			url = `https://${hostName}/index.html#/?token=${data.query.playerGameToken}&pcAddress=${hostName}&virtualSrc=https://${apiHostName}&apiSrc=https://${apiHostName}&themeBg=4C6FFF` +
				`&themeText=%7B"h5FgColor"%3A"%234C6FFF","pcFgColor"%3A"%234C6FFF","pcThemeCustomFgColor"%3A"%234C6FFF"%7D&controlMenu=2&language=${lang}`
		} else {
			url = `https://${urlReq?.hostname}/index.html#/?token=${data.query.playerGameToken}&nickname=${info?.UserName}&` +
				`pcAddress=https://${urlReq?.hostname}&virtualSrc=https://${apiHostName}&apiSrc=https://${apiHostName}&pushSrc=&platformName=FB体育&icoUrl=https://${urlReq?.hostname}/favicon.ico&` +
				`handicap=1&themeBg=4C6FFF&themeText=${themeText}&controlMenu=2&language=${lang}`
		}

		url = genGameUrlSignWithKeys(data.query, url, ["token", "pcAddress", "virtualSrc", "apiSrc"], true)

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