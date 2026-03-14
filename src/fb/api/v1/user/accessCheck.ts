import { contentJson, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class AccessCheck extends OpenAPIRoute {
	public schema = {
		tags: ["GamesEnter"],
		summary: "Gaems Enter And Login",
		operationId: "Gaems Enter And Login", // This is optional
		request: {
			query: z.object({
			}),
			body: contentJson(
				z.object({
					languageType: z.string(),
					version: z.string().optional(),
				})
			),
			responses: {
				"200": {
					description: "Returns the log details",
					...contentJson({
						code: z.string(),
						data: z.boolean(),
						success: z.boolean(),
					}),
				},
			},
		}
	};

	public async handle() {
		const data = await this.getValidatedData<typeof this.schema>();
		return FbService.V1User.accessCheck(data.body)
	}
}
