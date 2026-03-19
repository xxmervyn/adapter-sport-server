import { Hono } from "hono";
import { fromHono } from "chanfana";
import { V1SportTheme } from "./theme";

export const FbV1SportRouter = fromHono(new Hono());

FbV1SportRouter.post("/theme", V1SportTheme);
