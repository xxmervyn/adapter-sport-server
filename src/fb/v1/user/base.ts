import { OpenAPIRoute, contentJson } from "chanfana";
import { AppContext } from "../../../types";
import { z } from "zod";
import { FbService } from "../../../service/fb/fbService";

export class V1UserBase extends OpenAPIRoute {
    public schema = {
        tags: ["用户基本信息"],
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

    async handle(c: AppContext) {
        const data = await this.getValidatedData<typeof this.schema>();
		return await FbService.UserService.getUsertInfo(c.req, data.body);
    }
}
