import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1MatchMatchCount extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchMatchCount"],
        summary: "V1MatchMatchCount",
        operationId: "V1MatchMatchCount",
        request: {
            body: contentJson(
                z.object({
                    sportId: z.number().or(z.string()).optional(),
                    days: z.number().optional(),
                    timeZone: z.string().optional(),
                    markets: z.array(z.any()).optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchMatchCount",
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
        return FbService.V1Match.matchCount(data.body,c.req)
    }
}
