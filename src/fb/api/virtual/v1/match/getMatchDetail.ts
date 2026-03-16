import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class VirtualV1MatchGetMatchDetail extends OpenAPIRoute {
    public schema = {
        tags: ["VirtualV1MatchGetMatchDetail"],
        summary: "VirtualV1MatchGetMatchDetail",
        operationId: "VirtualV1MatchGetMatchDetail",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    matchId: z.number().optional(),
                    oddsType: z.number().optional(),
                })
            ),
        },
        responses: {
            "200": {
                description: "VirtualV1MatchGetMatchDetail",
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
        return FbService.VirtualV1Match.getMatchDetail(data.body, c.req)   
    }
}
