import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1MatchStatistical extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchStatistical"],
        summary: "V1MatchStatistical",
        operationId: "V1MatchStatistical",
        request: {
            body: contentJson(
                z.object({
      languageType: z.string(),
      markets: z.array(z.any()),
      sportTypes: z.array(z.any()),
    })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchStatistical",
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
