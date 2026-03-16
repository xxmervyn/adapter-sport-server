import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext } from "../../../../../types";
import { FbService } from "../../../../service/fbService";

export class FbV1OrderCashOutReserveBet extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderCashOutReserveBet"],
        summary: "FbV1OrderCashOutReserveBet",
        operationId: "FbV1OrderCashOutReserveBet",
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
                description: "FbV1OrderCashOutReserveBet",
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
        return FbService.V1OrderCashOutReserveApi.bet(data.body, c.req)
    }
}
