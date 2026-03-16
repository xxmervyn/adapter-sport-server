import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class VirtualV1StatGetByMatchId extends OpenAPIRoute {
    public schema = {
        tags: ["VirtualV1StatGetByMatchId"],
        summary: "VirtualV1StatGetByMatchId",
        operationId: "VirtualV1StatGetByMatchId",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    matchId: z.number(),
                })
            ),
        },
        responses: {
            "200": {
                description: "VirtualV1StatGetByMatchId",
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
