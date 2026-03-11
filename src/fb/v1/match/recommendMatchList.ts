import { OpenAPIRoute, contentJson } from "chanfana";
import { AppContext } from "../../../types";
import { z } from "zod";
import { FbService } from "../../../service/fb/fbService";

export class V1MatchRecommendMatchList extends OpenAPIRoute {
    public schema = {
        tags: ["猜你喜欢"],
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
		return FbService.MatchService.recommendMatchList(c.req, data.body);
    }
}