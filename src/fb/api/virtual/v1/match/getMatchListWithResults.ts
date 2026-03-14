import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";

export class VirtualV1MatchGetMatchListWithResults extends OpenAPIRoute {
    public schema = {
        tags: ["VirtualV1MatchGetMatchListWithResults"],
        summary: "VirtualV1MatchGetMatchListWithResults",
        operationId: "VirtualV1MatchGetMatchListWithResults",
        request: {
            body: contentJson(
                z.object({
                    sportId: z.string(),
                    beginTime: z.number(),
                    endTime: z.number(),
                    languageType: z.string(),
                    current: z.number(),
                    size: z.number(),
                    orderBy: z.number(),
                    leagueIds: z.array(z.any())
                })
            ),
        },
        responses: {
            "200": {
                description: "VirtualV1MatchGetMatchListWithResults",
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
        return FbService.VirtualV1Match.getMatchListWithResults(data.body)
    }
}
