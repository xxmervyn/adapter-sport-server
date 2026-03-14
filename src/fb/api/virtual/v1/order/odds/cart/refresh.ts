import { OpenAPIRoute, contentJson } from "chanfana";
import { z } from "zod"; import { FbService } from "../../../../../../service/fbService";


export class VirtualV1OrderOddsCartRefresh extends OpenAPIRoute {
    public schema = {
        tags: ["VirtualV1OrderOddsCartRefresh"],
        summary: "VirtualV1OrderOddsCartRefresh",
        operationId: "VirtualV1OrderOddsCartRefresh",
        request: {
            body: contentJson(
                z.object({
                    languageType: z.string(),
                    oddsType: z.number().optional(),
                    currencyId: z.number().optional(),
                    betMatchMarketList: z.array(z.any()).optional()
                })
            ),
        },
        responses: {
            "200": {
                description: "VirtualV1OrderOddsCartRefresh",
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
        return FbService.V1OrderOddsCartApi.refresh(data.body)
    }
}
