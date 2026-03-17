import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class VirtualV1MatchGetList extends OpenAPIRoute {
    public schema = {
        tags: ["VirtualV1MatchGetList"],
        summary: "VirtualV1MatchGetList",
        operationId: "VirtualV1MatchGetList",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    oddsType: z.number().or(z.string()).optional(),
                    isPC: z.boolean().optional(),
                    leagueId: z.number().optional(),
                    blobkSize: z.number().optional(),
                    existLive: z.boolean().optional(),
                    time: z.number().optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "VirtualV1MatchGetList",
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
        return FbService.VirtualV1Match.getList(data.body, c.req)
    }
}
