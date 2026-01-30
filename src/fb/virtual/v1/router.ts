import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbVirtualV1MatchRouter } from "./match/router";

export const FbVirtualV1Router = fromHono(new Hono());

FbVirtualV1Router.route("/v1/match", FbVirtualV1MatchRouter);
