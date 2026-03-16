import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1MatchRecommendMatchList extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchRecommendMatchList"],
        summary: "V1MatchRecommendMatchList",
        operationId: "V1MatchRecommendMatchList",
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
                description: "V1MatchRecommendMatchList",
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
        return FbService.V1Match.recommendMatchList(data.body,c.req)
    }
}