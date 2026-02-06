import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../../types";
import { z } from "zod";
import { FbService } from "../../../service/fb/fbService";

export class LanguageStaticList extends OpenAPIRoute {
	public schema = {
		tags: ["LanguageStaticList"],
		summary: "LanguageStaticList",
		operationId: "LanguageStaticList", // This is optional
		request: {
			query: z.object({
			}),
			body: contentJson(
				z.object({
					languageType: z.string()
				}),
			),
			responses: {
				"200": {
					description: "LanguageStaticList",
					...contentJson({
						success: Boolean,
						result: z.object({
							code: z.string(),
							data: z.any(),
							success: z.boolean(),
						}),
					}),
				},
			},
		}
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		return FbService.LanguageStaticService.list(c.req)
	}
}
