import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1OrderNewReserveBetList extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderNewReserveBetList"],
        summary: "V1OrderNewReserveBetList",
        operationId: "V1OrderNewReserveBetList",
        request: {
            body: contentJson(
                z.object({
                    isFailed: z.boolean(),
                    languageType: z.string()
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderNewReserveBetList",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        return {"success":true,"data":{"ods":[],"sts":[]},"code":0};
    }
}
