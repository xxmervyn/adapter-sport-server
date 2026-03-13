import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1MatchQueryMatchByRecommend extends OpenAPIRoute {
    public schema = {
        tags: ["猜你喜欢"],
        summary: "V1MatchQueryMatchByRecommend",
        operationId: "V1MatchQueryMatchByRecommend",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    oddsType: z.number(),
                    size: z.number(),
                    random: z.boolean(),
                    isPC: z.boolean(),
                    sortType: z.number(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchQueryMatchByRecommend",
                ...contentJson({
                    code: z.number(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        const data = await this.getValidatedData<typeof this.schema>();
        return FbService.V1Match.queryMatchByRecommend(data.body)
    }
}