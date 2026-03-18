import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class FbV1OrderReserveGetBetParameter extends OpenAPIRoute {
    public schema = {
        tags: ["投注单"],
        summary: "FbV1OrderReserveGetBetParameter",
        operationId: "FbV1OrderReserveGetBetParameter",
        request: {
            body: contentJson(
                z.object({
                    currencyId: z.number(),
                    languageType: z.string(),
                    marketId: z.number().or(z.string()).optional(),
                    matchId: z.number().or(z.string()).optional(),
                    betMatchMarketList: z.any().optional(),
                    isSelectSeries: z.boolean().optional(),
                    optionType: z.number().optional(),
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderReserveGetBetParameter",
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
        return FbService.V1OrderReserve.getBetParameter(data.body, c.req)
    }
}
