import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext } from "../../../../../types";
import { FbService } from "../../../../service/fbService";

export class FbV1OrderCashOutReserveCancel extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderCashOutReserveCancel"],
        summary: "FbV1OrderCashOutReserveCancel",
        operationId: "FbV1OrderCashOutReserveCancel",
        request: {
            body: contentJson(
                z.object({
                    reserveCashOutId: z.number().or(z.string()),
                    languageType: z.string().optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderCashOutReserveCancel",
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
        return FbService.V1OrderCashOutReserveApi.cancel(data.body, c.req)
    }
}
