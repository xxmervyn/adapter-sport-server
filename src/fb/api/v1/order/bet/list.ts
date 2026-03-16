import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext } from "../../../../../types";
import { FbService } from "../../../../service/fbService";

export class FbV1OrderBetList extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderBetList"],
        summary: "FbV1OrderBetList",
        operationId: "FbV1OrderBetList",
        request: {
            body: contentJson(
                z.object({
                    unsettledAllowTimeRange: z.boolean().optional(),
                    isSettled: z.boolean(),
                    startTime: z.number().optional(),
                    endTime: z.number().optional(),
                    languageType: z.string().optional(),
                    current: z.number().optional(),
                    size: z.number().optional(),
                    timeType: z.number().optional(),
                    currencyId: z.number().optional(),
                    matchTypes: z.array(z.number()).optional(),
                    isCashout: z.boolean().optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderBetList",
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
        return FbService.V1OrderBetApi.list(data.body, c.req)
    }
}
