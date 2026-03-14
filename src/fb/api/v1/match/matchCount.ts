import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1MatchMatchCount extends OpenAPIRoute {
    public schema = {
        tags: ["我的关注", "LIVE滚球盘"],
        summary: "V1MatchMatchCount",
        operationId: "V1MatchMatchCount",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    oddsType: z.number(),
                    matchIds: z.array(z.number()).optional(),
                    onlyOneMarket: z.boolean()
                  })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchMatchCount",
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
        return FbService.V1Match.matchCount(data.body)
    }
}
