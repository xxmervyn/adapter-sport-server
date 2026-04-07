import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod"; import { FbService } from "../../../../../service/fbService";
import { AppContext } from "../../../../../../types";


export class VirtualV1OrderSingle extends OpenAPIRoute {
    public schema = {
        tags: ["VirtualV1OrderSingle"],
        summary: "VirtualV1OrderSingle",
        operationId: "VirtualV1OrderSingle",
        request: {
            body: contentJson(
                z.any()
            ),
        },
        responses: {
            "200": {
                description: "VirtualV1OrderSingle",
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
        return FbService.V1OrderSingle.bet(data.body, c.req)
    }
}
