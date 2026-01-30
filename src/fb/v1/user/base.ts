import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1UserBase extends OpenAPIRoute {
    public schema = {
        tags: ["V1UserBase"],
        summary: "V1UserBase",
        operationId: "V1UserBase",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1UserBase",
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
                "currencyId": 1,
                "uid": "3254482",
                "bl": "3069.44",
                "cbs": [
                    {
                        "bl": "3069.44",
                        "cid": 1
                    }
                ]
            },
            "code": 0
        };
    }
}
