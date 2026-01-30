import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1OrderNewBetList extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderNewBetList"],
        summary: "V1OrderNewBetList",
        operationId: "V1OrderNewBetList",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    isSettled: z.boolean(),
                    current: z.number(),
                    size: z.number(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderNewBetList",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        return {};
    }
}
