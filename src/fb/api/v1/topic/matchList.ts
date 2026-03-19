import { contentJson, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1TopicMatchList extends OpenAPIRoute {
	public schema = {
		tags: ["V1TopicMatchList"],
		summary: "V1TopicMatchList",
		operationId: "V1TopicMatchList", // This is optional
		request: {
			query: z.object({
			}),
			body: contentJson(
				z.object({
					languageType: z.string().optional(),
					id: z.number().or(z.string()).optional(),
					leagueId: z.number().or(z.string()).optional()
				}),
			),
			responses: {
				"200": {
					description: "V1TopicMatchList",
					...contentJson({
						code: z.string(),
						data: z.any(),
						success: z.boolean(),
					}),
				},
			},
		}
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		return FbService.V1Topic.matchList(data.body,c.req)
	}
}
