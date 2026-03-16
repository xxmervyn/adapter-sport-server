import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1MatchTips extends OpenAPIRoute {
    public schema = {
        tags: ["我的关注", "LIVE滚球盘"],
        summary: "V1MatchTips",
        operationId: "V1MatchTips",
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
                description: "V1MatchTips",
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
        return FbService.V1Match.tips(data.body,c.req)
    }
}
