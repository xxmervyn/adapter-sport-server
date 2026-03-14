import { Hono } from "hono";
import { fromHono } from "chanfana";
import { VirtualV1OrderOddsCartRefresh } from "./refresh";

export const FbVirtualV1OrderOddsCartRouter = fromHono(new Hono());
FbVirtualV1OrderOddsCartRouter.post("/refresh", VirtualV1OrderOddsCartRefresh);
