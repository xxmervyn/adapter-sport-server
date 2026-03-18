import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class FbV1OrderReserveBet extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderReserveBet"],
        summary: "FbV1OrderReserveBet",
        operationId: "FbV1OrderReserveBet",
        request: {
            body: contentJson(
                z.object({
                    deviceId: z.string().optional(),
                    unitStake: z.number(),
                    betOptionList: z.array(z.any()),
                    currencyId: z.number().optional(),
                    languageType: z.string().optional(),
                    pay: z.number().optional(),
                    relatedId: z.string().or(z.number()).optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderReserveBet",
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
        return FbService.V1OrderReserve.bet(data.body, c.req)
    }
}
