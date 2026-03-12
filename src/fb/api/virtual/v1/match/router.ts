import { Hono } from "hono";
import { fromHono } from "chanfana";
import { VirtualV1MatchStatistical } from "./statistical";
import { VirtualV1MatchGetMatchListWithResults } from "./getMatchListWithResults";
import { VirtualV1MatchGetList } from "./getList";
import { VirtualV1MatchGetMatchDetail } from "./getMatchDetail";

export const FbVirtualV1MatchRouter = fromHono(new Hono());
FbVirtualV1MatchRouter.post("/statistical", VirtualV1MatchStatistical);
FbVirtualV1MatchRouter.post("/getMatchListWithResults", VirtualV1MatchGetMatchListWithResults);
FbVirtualV1MatchRouter.post("/getList", VirtualV1MatchGetList);
FbVirtualV1MatchRouter.post("/getMatchDetail", VirtualV1MatchGetMatchDetail);
