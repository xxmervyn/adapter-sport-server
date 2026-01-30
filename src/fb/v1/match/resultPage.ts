import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1MatchResultPage extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchResultPage"],
        summary: "V1MatchResultPage",
        operationId: "V1MatchResultPage",
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
                description: "V1MatchResultPage",
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
