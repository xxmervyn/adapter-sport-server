import { contentJson, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

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
						code: z.any(),
						data: z.any(),
						success: z.boolean(),
					}),
				},
			},
		}
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		return FbService.LanguageStatic.list(data.body,c.req)
	}
}
