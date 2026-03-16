import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext } from "../../../../../../types";
import { FbService } from "../../../../../service/fbService";


export class FbV1OrderReserveCashOutstatusInfoByIdsRouter extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderReserveCashOutstatusInfoByIdsRouter"],
        summary: "FbV1OrderReserveCashOutstatusInfoByIdsRouter",
        operationId: "FbV1OrderReserveCashOutstatusInfoByIdsRouter",
        request: {
            body: contentJson(
                z.object({
                    reserveCashOutIds: z.array(z.any()),
                    languageType: z.string(),
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderReserveCashOutstatusInfoByIdsRouter",
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
        return FbService.V1OrderReserveCashOutApi.statusInfoByIds(data.body, c.req)
    }
}
