import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { UserService } from "../../../service/userService";
import { AppContext } from "../../../../types";

export class V1OrderGetStakeOrderStatus extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderGetStakeOrderStatus"],
        summary: "V1OrderGetStakeOrderStatus",
        operationId: "V1OrderGetStakeOrderStatus",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    orderIds: z.array(z.string()).optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderGetStakeOrderStatus",
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
        return UserService.V1Order.getStakeOrderStatus(data.body, c.req)
    }
}
