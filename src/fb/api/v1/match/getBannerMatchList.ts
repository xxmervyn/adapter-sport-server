import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1MatchGetBannerMatchList extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchGetBannerMatchList"],
        summary: "V1MatchGetBannerMatchList",
        operationId: "V1MatchGetBannerMatchList",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    platform: z.number(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1MatchGetBannerMatchList",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        const data = await this.getValidatedData<typeof this.schema>();
		return FbService.V1Match.getBannerMatchList(data.body)
    }
}
