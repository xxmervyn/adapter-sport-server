import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext } from "../../../../../../types";
import { UserService } from "../../../../../service/userService";

export class V1OrderNewBetList extends OpenAPIRoute {
    public schema = {
        tags: ["未结算注单"],
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

    async handle(c: AppContext) {
        const data = await this.getValidatedData<typeof this.schema>();
        return UserService.V1Order.newBetList(data.body, c.req)
    }
}
