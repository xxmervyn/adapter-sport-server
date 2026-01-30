import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1MatchGetMatchDetail extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchGetMatchDetail"],
        summary: "V1MatchGetMatchDetail",
        operationId: "V1MatchGetMatchDetail",
        request: {
            body: contentJson(
                z.object({
      languageType: z.string(),
      oddsType: z.number(),
      matchId: z.number(),
    })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchGetMatchDetail",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        return {};
    }
}
