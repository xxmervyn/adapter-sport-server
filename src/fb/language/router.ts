import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbLanguageStaticRouter } from "./static/router";

export const FbLanguageRouter = fromHono(new Hono());

FbLanguageRouter.route("/static", FbLanguageStaticRouter);
