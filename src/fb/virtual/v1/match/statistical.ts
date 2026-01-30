import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class VirtualV1MatchStatistical extends OpenAPIRoute {
    public schema = {
        tags: ["VirtualV1MatchStatistical"],
        summary: "VirtualV1MatchStatistical",
        operationId: "VirtualV1MatchStatistical",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                })
            ),
        },
        responses: {
            "200": {
                description: "VirtualV1MatchStatistical",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        return { "success": true, "message": null, "data": { "ssl": [{ "sid": "1001", "ls": [{ "id": "19089", "na": "歐洲錦標賽", "lurl": "https://ns-static.s3.ap-northeast-1.amazonaws.com/data/dc3dde700eb3cd55cb58940a7bad3577.png" }, { "id": "21895", "na": "西班牙聯賽", "lurl": "" }, { "id": "21255", "na": "意大利聯賽", "lurl": "https://ns-static.s3.ap-northeast-1.amazonaws.com/data/dc3dde700eb3cd55cb58940a7bad3577.png" }, { "id": "21257", "na": "英格蘭聯賽", "lurl": "https://ns-static.s3.ap-northeast-1.amazonaws.com/data/dc3dde700eb3cd55cb58940a7bad3577.png" }] }, { "sid": "1020", "ls": [] }, { "sid": "1021", "ls": [] }, { "sid": "1022", "ls": [] }, { "sid": "1023", "ls": [] }] }, "code": 0 };
    }
}
