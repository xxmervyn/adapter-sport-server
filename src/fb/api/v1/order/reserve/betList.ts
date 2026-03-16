import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class FbV1OrderReserveBetList extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderReserveBetList"],
        summary: "FbV1OrderReserveBetList",
        operationId: "FbV1OrderReserveBetList",
        request: {
            body: contentJson(
                z.object({
                    startTime: z.string().optional(),
                    endTime: z.string().optional(),
                    languageType: z.string().optional(),
                    isFailed: z.boolean(),
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderReserveBetList",
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
        return FbService.V1OrderReserve.betList(data.body, c.req)
    }
}
