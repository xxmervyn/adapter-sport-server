import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../types";
import { z } from "zod";
import { MD5 } from "crypto-js";

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

		const urlReq = URL.parse(c.req.url);
		const apiHostName = urlReq?.hostname.replace(".", "-api.");

		var url = `https://${urlReq?.hostname}/index.html#/?token=${data.query.playerGameToken}&nickname=t013&` +
			`pcAddress=https://${urlReq?.hostname}&virtualSrc=https://v.${apiHostName}&apiSrc=https://${apiHostName}&pushSrc=wss://push.${apiHostName}&platformName=FB体育&icoUrl=https://${urlReq?.hostname}/favicon.ico&` +
			`handicap=1&themeBg=4C6FFF&themeText={&quot;h5FgColor&quot;:&quot;#4C6FFF&quot;,&quot;pcFgColor&quot;:&quot;#4C6FFF&quot;,&quot;pcThemeCustomFgColor&quot;:&quot;#4C6FFF&quot;}` +
			`&controlMenu=2&language=ZHO`
		url = genGameUrlSignWithKeys(url, ["token", "pcAddress", "virtualSrc", "apiSrc"], false)

		return c.redirect(url)
	}
}


function genGameUrlSignWithKeys(url: string, keys: string[] | null, changeJinhan: boolean): string {

	const reqTime = Math.floor(Date.now() / 1000).toString();

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

		fullHref = urlDetail.host + "&" + reqTime;

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