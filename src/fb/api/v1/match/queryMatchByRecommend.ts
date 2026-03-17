import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1MatchQueryMatchByRecommend extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchQueryMatchByRecommend"],
        summary: "V1MatchQueryMatchByRecommend",
        operationId: "V1MatchQueryMatchByRecommend",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    oddsType: z.number().or(z.string()).optional(),
                    size: z.number().optional(),
                    recommend: z.string().optional(),
                    random: z.boolean().optional(),
                    isPC: z.boolean().optional(),
                    sortType: z.number().optional(),
                    orderBy: z.number().optional(),
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

    async handle(c: AppContext) {
        const data = await this.getValidatedData<typeof this.schema>();
        return FbService.V1Match.queryMatchByRecommend(data.body,c.req)
    }
}