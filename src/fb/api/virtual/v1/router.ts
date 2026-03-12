import { Hono } from "hono";
import { fromHono } from "chanfana";
import { FbVirtualV1MatchRouter } from "./match/router";
import { FbVirtualV1StatRouter } from "./stat/router";

export const FbVirtualV1Router = fromHono(new Hono());

FbVirtualV1Router.route("/v1/match", FbVirtualV1MatchRouter);
FbVirtualV1Router.route("/v1/stat", FbVirtualV1StatRouter);
