import { contentJson, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class MerchantDetail extends OpenAPIRoute {
	public schema = {
		tags: ["MerchantDetail"],
		summary: "MerchantDetail",
		operationId: "MerchantDetail", // This is optional
		request: {
			query: z.object({
			}),
			body: contentJson(
				z.object({
					
				}),
			),
            responses: {
                "200": {
                    description: "MerchantDetail",
                    ...contentJson({
                        code: z.string(),
                        data: z.any(),
                        success: z.boolean(),
                    }),
                },
            },
		}
	};

	public async handle() {
        const data = await this.getValidatedData<typeof this.schema>();
        return FbService.V1Merchant.detail(data.body)
	}
}
