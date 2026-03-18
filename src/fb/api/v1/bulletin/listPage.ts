import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";
import { AppContext } from "../../../../types";

export class V1BulletinListPage extends OpenAPIRoute {
    public schema = {
        tags: ["V1BulletinListPage"],
        summary: "V1BulletinListPage",
        operationId: "V1BulletinListPage",
        request: {
            body: contentJson(
                z.object({
                    current: z.number().optional(),
                    size: z.number().optional(),
                    orders: z.array(z.any()).optional(),
                    languageType: z.string(),
                    sportId: z.number().or(z.string()).optional(),
                    startTime: z.number().optional(),
                    endTime: z.number().optional(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1BulletinListPage",
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
        return FbService.V1Bulletin.listPage(data.body, c.req)
    }
}
