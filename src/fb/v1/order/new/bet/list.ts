import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod";

export class V1OrderNewBetList extends OpenAPIRoute {
    public schema = {
        tags: ["V1OrderNewBetList"],
        summary: "V1OrderNewBetList",
        operationId: "V1OrderNewBetList",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    isSettled: z.boolean(),
                    current: z.number(),
                    size: z.number(),
                })
            ),
        },
        responses: {
            "200": {
                description: "V1OrderNewBetList",
                ...contentJson({
                    code: z.any(),
                    data: z.any(),
                    success: z.boolean(),
                }),
            },
        },
    };

    async handle() {
        return { "success": true, "data": { "current": 1, "size": 1, "total": 2, "totalType": 0, "records": [{ "ops": [{ "sid": 1, "mid": 3965076, "mn": "墨西哥 vs 南非", "lid": 17663, "ln": "世界盃2026(在加拿大、墨西哥&美國)", "bt": 1781204400000, "pe": 1001, "mty": 1005, "on": "墨西哥", "onm": "墨西哥", "ip": false, "te": [{ "na": "墨西哥", "id": 72741 }, { "na": "南非", "id": 52725 }], "bo": "1.41", "of": 1, "re": "", "mrid": 224432679, "ty": 1, "od": 1.41, "mgn": "獨贏", "mtp": 2, "fmt": 100001, "fid": 2, "ms": 4, "scs": [], "mc": { "pe": 1001, "r": false } }], "id": "1616054290785241298", "uwl": "0", "sert": 0, "bn": 1, "al": 1, "sat": 50, "st": 4, "oc": 1, "cte": 1765941480473, "mt": 1765941480526, "us": 50, "bt": "1x1*1", "ab": true, "ic": 1, "sv": 1, "lwa": 20.5, "mla": 70.5, "mwa": 20.5, "cid": 1, "exr": 1, "co": 1, "ss": false }], "sts": [{ "cid": 1, "ct": 2, "sa": 60 }] }, "code": 0 };
    }
}
