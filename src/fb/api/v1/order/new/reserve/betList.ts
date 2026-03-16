import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { UserService } from "../../../../../service/userService";
import { AppContext } from "../../../../../../types";
import { FbService } from "../../../../../service/fbService";

export class V1OrderNewReserveBetList extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderNewReserveBetList"],
        summary: "V1OrderNewReserveBetList",
        operationId: "V1OrderNewReserveBetList",
        request: {
            body: contentJson(
                z.object({
                    startTime: z.string().optional(),
                    endTime: z.string().optional(),
                    currencyId: z.number().optional(),
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
        return FbService.V1OrderNewBetReserveApi.newReserveBetList(data.body, c.req)
    }
}
