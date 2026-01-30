import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../../../types";
import { z } from "zod";

export class MerchantDetail extends OpenAPIRoute {
	public schema = {
		tags: ["MerchantDetail"],
		summary: "MerchantDetail",
		operationId: "MerchantDetail", // This is optional
		request: {
			query: z.object({
			}),
			body: contentJson(
				z.object({
					
				}),
			),
            responses: {
                "200": {
                    description: "MerchantDetail",
                    ...contentJson({
                        success: Boolean,
                        result: z.object({
                            code: z.string(),
                            data: z.any(),
                            success: z.boolean(),
                        }),
                    }),
                },
            },
		}
	};

	public async handle(c: AppContext) {
		const data = await this.getValidatedData<typeof this.schema>();
	
		return {
			success: true,
			result: {
				code: 0,
				data: {
                    "st": 1,
                    "tmz": "Etc/GMT+4",
                    "bo": 1,
                    "rpd": 1,
                    "co": 2,
                    "boc": 2,
                    "pco": 1,
                    "pbc": 1,
                    "sss": [
                        1,
                        3,
                        164,
                        165,
                        179,
                        180,
                        169,
                        177,
                        178,
                        5,
                        16,
                        13,
                        47,
                        15,
                        7,
                        8,
                        2,
                        6,
                        4,
                        17,
                        18,
                        19,
                        51,
                        14,
                        24,
                        20,
                        92,
                        1001,
                        1020,
                        1021,
                        1023,
                        1022
                    ],
                    "oss": [
                        1,
                        3,
                        164,
                        165,
                        179,
                        180,
                        169,
                        177,
                        178,
                        5,
                        16,
                        13,
                        47,
                        15,
                        7,
                        8,
                        2,
                        6,
                        4,
                        17,
                        18,
                        19,
                        51,
                        14,
                        24,
                        20,
                        92,
                        95,
                        25,
                        12,
                        94,
                        100,
                        101,
                        93
                    ],
                    "wt": 1,
                    "pt": 1,
                    "ct": 1,
                    "cis": [
                        1,
                        1201,
                        1202,
                        1203,
                        1204,
                        1205,
                        200
                    ],
                    "tdl": "/merchant/banner/1322238919152365569/4b52bc4d1a6e835af0266fe2cc447603.png",
                    "tnl": "/merchant/banner/1322238919152365569/c7653dd77c919decb994f7cae247ed7f.png",
                    "otp": [
                        1,
                        2,
                        3,
                        4,
                        5
                    ],
                    "ots": 2,
                    "mp": 30
                },
				success: true,
			},
		};
	}
}
