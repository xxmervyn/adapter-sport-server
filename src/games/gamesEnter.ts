import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../types";
import { z } from "zod";

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
		const apiHostName = urlReq?.hostname.replace(".","-api.");
		//https://fbsports.appplaygasdsd.org/index.html?token=tt_Eqszk6rfTLJ0k557ieBGbn4utAF86jDB.c5b56b065029f573de29c77477762f4e&nickname=t012&pcAddress=https://c.e70cz.com&virtualSrc=https://v.api.fbs01.com&apiSrc=https://api.a233z1.com&pushSrc=wss://push.5890v.com&platformName=FB%E4%BD%93%E8%82%B2&icoUrl=https://ns-client.newsportspro.com/favicon.ico&handicap=1&themeBg=4C6FFF&themeText={%22h5FgColor%22:%22#/undefined?pcAddress=https%3A%2F%2Fc.e70cz.com&themeBg=4C6FFF&themeText=%7B%22h5FgColor%22%3A%22%23%2F
		// return c.redirect(`https://${urlReq?.hostname}/index.html?token=${data.query.playerGameToken}&nickname=${"nickname"}&apiSrc=https://${apiHostName}`);
		return c.redirect(`https://${urlReq?.hostname}/index.html#/?token=${data.query.playerGameToken}&nickname=t013&`+
			`pcAddress=https://${urlReq?.hostname}&virtualSrc=https://v.${apiHostName}&apiSrc=https://${apiHostName}&pushSrc=wss://push.${apiHostName}&platformName=FB体育&icoUrl=https://${urlReq?.hostname}/favicon.ico&`+
			`handicap=1&themeBg=4C6FFF&themeText={&quot;h5FgColor&quot;:&quot;#4C6FFF&quot;,&quot;pcFgColor&quot;:&quot;#4C6FFF&quot;,&quot;pcThemeCustomFgColor&quot;:&quot;#4C6FFF&quot;}`+
			`&controlMenu=2&language=ZHO`)
	}
}
