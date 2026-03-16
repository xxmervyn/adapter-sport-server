import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1MatchListMarketGroup extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchListMarketGroup"],
        summary: "V1MatchListMarketGroup",
        operationId: "V1MatchListMarketGroup",
        request: {
            body: contentJson(
                z.object({
                    oddsType: z.number(),
                    languageType: z.string(),
                    matchId: z.number(),
                    tag: z.string()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchListMarketGroup",
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
        return FbService.V1Match.listMarketGroup(data.body,c.req)
    }
}
