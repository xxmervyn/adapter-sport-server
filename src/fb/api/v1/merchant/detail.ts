import { contentJson, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1MerchantDetail extends OpenAPIRoute {
	public schema = {
		tags: ["V1MerchantDetail"],
		summary: "V1MerchantDetail",
		operationId: "V1MerchantDetail", // This is optional
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
                    description: "V1MerchantDetail",
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
