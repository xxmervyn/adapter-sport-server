import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../../types";
import { z } from "zod";

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
					
				}),
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

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
		
		return {
            code: 0,
            data: false,
            success: true,
		};
	}
}
