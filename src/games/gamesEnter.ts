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
		return c.redirect(`https://${urlReq?.hostname}/index.html?token=${data.query.playerGameToken}&nickname=${"nickname"}&apiSrc=https://${apiHostName}`);

	}
}
