import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { UserService } from "../../../service/userService";
import { AppContext } from "../../../../types";

export class V1OrderEarlySettlementBet extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderEarlySettlementBet"],
        summary: "V1OrderEarlySettlementBet",
        operationId: "V1OrderEarlySettlementBet",
        request: {
            body: contentJson(
                z.any()
            ),
        },
        responses: {
            "200": {
                description: "V1OrderEarlySettlementBet",
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
        return FbService.V1Order.earlySettlementBet(data.body, c.req)
    }
}
