import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { UserService } from "../../../service/userService";
import { AppContext } from "../../../../types";

export class V1OrderGetCashOutsByIds extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderGetCashOutsByIds"],
        summary: "V1OrderGetCashOutsByIds",
        operationId: "V1OrderGetCashOutsByIds",
        request: {
            body: contentJson(
                z.object({
                    ids: z.array(z.any()),
                    languageType: z.string().optional(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderGetCashOutsByIds",
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
        return FbService.V1Order.getCashOutsByIds(data.body, c.req)
    }
}
