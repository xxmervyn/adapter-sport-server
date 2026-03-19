import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { AppContext } from "../../../../../types";
import { FbService } from "../../../../service/fbService";

export class FbV1OrderBetSinglePass extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderBetSinglePass"],
        summary: "FbV1OrderBetSinglePass",
        operationId: "FbV1OrderBetSinglePass",
        request: {
            body: contentJson(
                z.object({
                    currencyId: z.number(),
                    languageType: z.string(),
                    singleBetList: z.any()
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderBetSinglePass",
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
        return FbService.V1OrderBet.singlePass(data.body, c.req)
    }
}
