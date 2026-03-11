import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class FbV1OrderBetSinglePass extends OpenAPIRoute {
    public schema = {
        tags: ["投注"],
        summary: "FbV1OrderCashOutPrice",
        operationId: "FbV1OrderCashOutPrice",
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
        return {
            "success": true,
            "data": [
                {
                    "id": "1678540196540320772",
                    "st": 0,
                    "ops": [
                        {
                            "mid": "260104536",
                            "od": "1.06",
                            "of": 1,
                            "bod": "1.06"
                        }
                    ]
                }
            ],
            "code": 0
        };
    }
}
