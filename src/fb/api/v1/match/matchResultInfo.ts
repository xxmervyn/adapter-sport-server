import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1MatchMatchResultInfo extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchMatchResultInfo"],
        summary: "V1MatchMatchResultInfo",
        operationId: "V1MatchMatchResultInfo",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    matchId: z.any(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchMatchResultInfo",
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
        return FbService.V1Match.matchResultInfo(data.body,c.req)
    }
}
