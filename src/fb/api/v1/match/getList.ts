import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1MatchGetList extends OpenAPIRoute {
    public schema = {
        tags: ["我的关注", "LIVE滚球盘"],
        summary: "V1MatchGetList",
        operationId: "V1MatchGetList",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    oddsType: z.number().or(z.string()).optional(),
                    sportTypes: z.array(z.number()).optional(),
                    current: z.number().optional(),
                    isPC: z.boolean().optional(),
                    orderBy: z.number().optional(),
                    matchIds: z.array(z.number()).optional(),
                    markets: z.array(z.any()).optional(),
                    sportId: z.number().or(z.string()).optional(),
                    type: z.number().optional(),
                    leagueIds: z.array(z.number()).optional(),
                    leaguePhases: z.array(z.any()).optional(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchGetList",
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
        return FbService.V1Match.getList(data.body, c.req)
    }
}
