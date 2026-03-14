import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1MatchGetOnSaleLeagues extends OpenAPIRoute {
    public schema = {
        tags: ["我的关注", "LIVE滚球盘"],
        summary: "V1MatchGetOnSaleLeagues",
        operationId: "V1MatchGetOnSaleLeagues",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    oddsType: z.number(),
                    sportTypes: z.array(z.number()),
                    markets: z.array(z.any()).optional(),
                    sportId: z.number().optional(),
                    current: z.number(),
                    isPC: z.boolean(),
                    orderBy: z.number(),
                    type: z.number(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchGetOnSaleLeagues",
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
		return FbService.V1Match.getOnSaleLeagues(data.body)
    }
}
