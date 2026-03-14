import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";
import { FbService } from "../../../service/fbService";

export class V1MatchGetLiveList extends OpenAPIRoute {
    public schema = {
        tags: ["V1MatchGetLiveList"],
        summary: "V1MatchGetLiveList",
        operationId: "V1MatchGetLiveList",
        request: {
            body: contentJson(
                z.any()
            ),
        },
        responses: {
            "200": {
                description: "V1MatchGetLiveList",
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
        return FbService.V1Match.getLiveList(data.body)
    }
}
