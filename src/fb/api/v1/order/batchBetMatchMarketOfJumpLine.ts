import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1OrderBatchBetMatchMarketOfJumpLine extends OpenAPIRoute {
    public schema = {
        tags: ["投注单"],
        summary: "V1OrderBatchBetMatchMarketOfJumpLine",
        operationId: "V1OrderBatchBetMatchMarketOfJumpLine",
        request: {
            body: contentJson(
                z.object({
                    betMatchMarketList: z.any(),
                    currencyId: z.number(),
                    isSelectSeries: z.boolean(),
                    languageType: z.string()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderBatchBetMatchMarketOfJumpLine",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        const data = await this.getValidatedData<typeof this.schema>();
		return FbService.V1Order.batchBetMatchMarketOfJumpLine(data.body)
    }
}
