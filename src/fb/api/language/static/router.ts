import { Hono } from "hono";
import { fromHono } from "chanfana";
import { LanguageStaticList } from "./list";

export const FbLanguageStaticRouter = fromHono(new Hono());
FbLanguageStaticRouter.post("/list", LanguageStaticList);
