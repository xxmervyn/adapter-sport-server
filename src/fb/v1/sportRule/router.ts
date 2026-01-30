import { Hono } from "hono";
import { fromHono } from "chanfana";
import { V1SportRuleList } from "./list";

export const FbV1SportRuleRouter = fromHono(new Hono());

FbV1SportRuleRouter.post("/list", V1SportRuleList);
