import { Hono } from "hono";
import { fromHono } from "chanfana";
import { V1TopicMatchList } from "./matchList";
import { V1TopicPlayerStatList } from "./playerStatList";
import { V1TopicTeamStatList } from "./teamStatList";
export const FbV1TopicRouter = fromHono(new Hono());


FbV1TopicRouter.post("/matchList", V1TopicMatchList)
FbV1TopicRouter.post("/teamStatList", V1TopicTeamStatList)
FbV1TopicRouter.post("/playerStatList", V1TopicPlayerStatList)