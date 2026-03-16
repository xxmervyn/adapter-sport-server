import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { UserService } from "../../../service/userService";
import { AppContext } from "../../../../types";

export class V1OrderBatchBetMatchMarketOfJumpLine extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderBatchBetMatchMarketOfJumpLine"],
        summary: "V1OrderBatchBetMatchMarketOfJumpLine",
        operationId: "V1OrderBatchBetMatchMarketOfJumpLine",
        request: {
            body: contentJson(
                z.object({
                    betMatchMarketList: z.array(z.any()).optional(),
                    currencyId: z.number().nullable().optional(),
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

    async handle(c: AppContext) {
        const data = await this.getValidatedData<typeof this.schema>();
        return FbService.V1Order.batchBetMatchMarketOfJumpLine(data.body, c.req)
    }
}
