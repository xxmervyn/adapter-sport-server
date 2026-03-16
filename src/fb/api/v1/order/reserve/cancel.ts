import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class FbV1OrderReserveCancel extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderReserveCancel"],
        summary: "FbV1OrderReserveCancel",
        operationId: "FbV1OrderReserveCancel",
        request: {
            body: contentJson(
                z.object({
                    reserveId: z.number(),
                    languageType: z.string().optional()
                  })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderReserveCancel",
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
        return FbService.V1OrderReserve.cancel(data.body, c.req)
    }
}
