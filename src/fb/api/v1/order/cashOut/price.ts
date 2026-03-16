import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext } from "../../../../../types";
import { FbService } from "../../../../service/fbService";

export class FbV1OrderCashOutPrice extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderCashOutPrice"],
        summary: "FbV1OrderCashOutPrice",
        operationId: "FbV1OrderCashOutPrice",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    orderIds: z.array(z.number()).optional(),
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderCashOutPrice",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle(c: AppContext) {
        const data = await this.getValidatedData<typeof this.schema>();
        return FbService.V1OrderCashOutApi.price(data.body, c.req)
    }
}
