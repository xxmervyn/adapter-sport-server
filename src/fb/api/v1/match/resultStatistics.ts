import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1MatchResultStatistics extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchResultStatistics"],
        summary: "V1MatchResultStatistics",
        operationId: "V1MatchResultStatistics",
        request: {
            body: contentJson(
                z.object({
                    startTime: z.number().or(z.string()),
                    endTime: z.number().or(z.string()),
                    sportId: z.number().or(z.string()).optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchResultStatistics",
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
        return FbService.V1Match.resultStatistics(data.body,c.req)
    }
}
