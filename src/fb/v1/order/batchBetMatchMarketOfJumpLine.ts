import { OpenAPIRoute, contentJson } from "chanfana";
import { AppContext } from "../../../types";
import { z } from "zod";
import { FbService } from "../../../service/fb/fbService";

export class V1OrderNewBatchBetMatchMarketOfJumpLine extends OpenAPIRoute {
    public schema = {
        tags: ["投注单"],
        summary: "V1OrderNewBatchBetMatchMarketOfJumpLine",
        operationId: "V1OrderNewBatchBetMatchMarketOfJumpLine",
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
                description: "V1OrderNewBatchBetMatchMarketOfJumpLine",
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
		return await FbService.BetService.betchBetList(c.req, data.body);
    }
}
