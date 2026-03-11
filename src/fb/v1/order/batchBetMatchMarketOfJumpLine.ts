import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1OrderNewBatchBetMatchMarketOfJumpLine extends OpenAPIRoute {
    public schema = {
        tags: ["投注单"],
        summary: "V1OrderNewBatchBetMatchMarketOfJumpLine",
        operationId: "V1OrderNewBatchBetMatchMarketOfJumpLine",
        request: {
            body: contentJson(
                z.object({
                    betMatchMarketList: z.any(),
                    currencyId: z.number(),
                    isSelectSeries: z.boolean(),
                    languageType: z.string()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderNewBatchBetMatchMarketOfJumpLine",
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
            "data": {
                "bms": [
                    {
                        "mid": 259062928,
                        "op": {
                            "na": "神戶勝利船",
                            "nm": "神戶勝利船 -0.5/1",
                            "ty": 1,
                            "od": 1.79,
                            "bod": 1.79,
                            "odt": 1,
                            "li": "-0.5/1"
                        },
                        "smin": 10,
                        "smax": 4000,
                        "au": 1,
                        "ss": 1,
                        "ip": 0,
                        "scs": []
                    }
                ],
                "mon": 30,
                "msl": 30
            },
            "code": 0
        };
    }
}
