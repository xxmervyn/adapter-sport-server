import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1MatchResultPage extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchResultPage"],
        summary: "V1MatchResultPage",
        operationId: "V1MatchResultPage",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    oddsType: z.number().optional(),
                    matchId: z.string().optional(),
                    beginTime: z.number().optional(),
                    current: z.number().optional(),
                    endTime: z.number().optional(),
                    matchType: z.number().optional(),
                    orderBy: z.number().optional(),
                    size: z.number().optional(),
                    sportId: z.string().optional(),
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
        const data = await this.getValidatedData<typeof this.schema>();
        return FbService.V1Match.matchResultPage(data.body)
    }
}
