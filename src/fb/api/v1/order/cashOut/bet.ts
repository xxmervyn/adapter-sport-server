import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext } from "../../../../../types";
import { FbService } from "../../../../service/fbService";

export class FbV1OrderCashOutBet extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderCashOutBet"],
        summary: "FbV1OrderCashOutBet",
        operationId: "FbV1OrderCashOutBet",
        request: {
            body: contentJson(
                z.object({
                    deviceId: z.string().optional(),
                    orderId: z.number(),
                    cashOutStake: z.number(),
                    unitCashOutPayoutStake: z.number(),
                    acceptOddsChange: z.boolean(),
                    parlay: z.boolean().optional(),
                    languageType: z.string().optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderCashOutBet",
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
        return FbService.V1OrderCashOutApi.bet(data.body, c.req)
    }
}
