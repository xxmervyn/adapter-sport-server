import { Hono } from "hono";
import { fromHono } from "chanfana";
import { V1MatchStatistical } from "./statistical";
import { V1MatchGetList } from "./getList";
import { V1MatchGetBannerMatchList } from "./getBannerMatchList";
import { V1MatchGetMatchDetail } from "./getMatchDetail";
import { V1MatchRecommendMatchList } from "./recommendMatchList";

export const FbV1MatchRouter = fromHono(new Hono());
FbV1MatchRouter.post("/statistical", V1MatchStatistical);
FbV1MatchRouter.post("/getList", V1MatchGetList);
FbV1MatchRouter.post("/getBannerMatchList", V1MatchGetBannerMatchList);
FbV1MatchRouter.post("/getMatchDetail", V1MatchGetMatchDetail);
FbV1MatchRouter.post("/recommendMatchList", V1MatchRecommendMatchList);
