import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../../service/fbService";
import { AppContext } from "../../../../../types";

export class FbV1OrderReserveStatusInfoByIds extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderReserveStatusInfoByIds"],
        summary: "FbV1OrderReserveStatusInfoByIds",
        operationId: "FbV1OrderReserveStatusInfoByIds",
        request: {
            body: contentJson(
                z.object({
                    reserveIds: z.array(z.any()),
                    languageType: z.string().optional(),
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderReserveStatusInfoByIds",
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
        return FbService.V1OrderReserve.statusInfoByIds(data.body, c.req)
    }
}
