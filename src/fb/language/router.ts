import { Hono } from "hono";
import { fromHono } from "chanfana";
import { LanguageStaticList } from "./staticList";
export const FbLanguageRouter = fromHono(new Hono());


FbLanguageRouter.post("/static/list",LanguageStaticList)