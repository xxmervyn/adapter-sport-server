import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { UserService } from "../../../service/userService";
import { AppContext } from "../../../../types";

export class V1OrderBetMultiple extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderBetMultiple"],
        summary: "V1OrderBetMultiple",
        operationId: "V1OrderBetMultiple",
        request: {
            body: contentJson(
                z.object({
                    betMultipleData: z.array(z.any()),
                    deviceId: z.string().optional(),
                    betOptionList: z.array(z.any()),
                    currencyId: z.number().int().optional(),
                    languageType: z.string().optional(),
                    relatedId: z.string().optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderBetMultiple",
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
        return FbService.V1Order.betMultiple(data.body, c.req)
    }
}
