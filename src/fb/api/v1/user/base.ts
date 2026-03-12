import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { UserService } from "../../../service/userService";
import { AppContext } from "../../../../types";

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
        return await UserService.V1User.base(data.body, c.req);
    }
}
