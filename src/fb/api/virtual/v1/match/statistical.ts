import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class VirtualV1MatchStatistical extends OpenAPIRoute {
    public schema = {
        tags: ["VirtualV1MatchStatistical"],
        summary: "VirtualV1MatchStatistical",
        operationId: "VirtualV1MatchStatistical",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                })
            ),
        },
        responses: {
            "200": {
                description: "VirtualV1MatchStatistical",
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
        return FbService.VirtualV1Match.statistical(data.body, c.req)
    }
}
