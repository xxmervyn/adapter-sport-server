import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class FbV1OrderCashOutPrice extends OpenAPIRoute {
    public schema = {
        tags: ["FbV1OrderCashOutPrice"],
        summary: "FbV1OrderCashOutPrice",
        operationId: "FbV1OrderCashOutPrice",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    orderIds: z.any()
                })
            ),
        },
        responses: {
            "200": {
                description: "FbV1OrderCashOutPrice",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        return {"success":true,"data":{"mxc":5,"pr":[{"oid":"1616054290785241298","amt":0.842,"st":4,"smis":10,"pmis":5}]},"code":0};
    }
}
