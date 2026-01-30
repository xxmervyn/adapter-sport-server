import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1BulletinListTop extends OpenAPIRoute {
    public schema = {
        tags: ["V1BulletinListTop"],
        summary: "V1BulletinListTop",
        operationId: "V1BulletinListTop",
        request: {
            body: contentJson(
                z.object({
      languageType: z.string(),
    })
            ),
        },
        responses: {
            "200": {
                description: "V1BulletinListTop",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        return {};
    }
}
