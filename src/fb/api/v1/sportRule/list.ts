import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1SportRuleList extends OpenAPIRoute {
    public schema = {
        tags: ["V1SportRuleList"],
        summary: "V1SportRuleList",
        operationId: "V1SportRuleList",
        request: {
            body: contentJson(
                z.object({
                    current: z.number(),
                    languageType: z.string(),
                    size: z.number()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1SportRuleList",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        const data = await this.getValidatedData<typeof this.schema>();
        return FbService.V1SportRule.list(data.body)
    }
}
