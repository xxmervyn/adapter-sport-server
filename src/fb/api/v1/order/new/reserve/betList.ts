import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { UserService } from "../../../../../service/userService";
import { AppContext } from "../../../../../../types";

export class V1OrderNewReserveBetList extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderNewReserveBetList"],
        summary: "V1OrderNewReserveBetList",
        operationId: "V1OrderNewReserveBetList",
        request: {
            body: contentJson(
                z.object({
                    isFailed: z.boolean(),
                    languageType: z.string()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderNewReserveBetList",
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
        return UserService.V1Order.newReserveBetList(data.body, c.req)
    }
}
