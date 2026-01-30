import { ApiException, fromHono } from "chanfana";
import { Hono } from "hono";
import {cors} from "hono/cors"
import { ContentfulStatusCode } from "hono/utils/http-status";
import { GamesEnterEndpoint } from "./games/gamesEnter";
import { FbV1Router } from "./fb/v1/router";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

app.onError((err, c) => {
	if (err instanceof ApiException) {
		// If it's a Chanfana ApiException, let Chanfana handle the response
		return c.json(
			{ success: false, errors: err.buildResponse() },
			err.status as ContentfulStatusCode,
		);
	}

	console.error("Global error handler caught:", err); // Log the error if it's not known

	// For other errors, return a generic 500 response
	return c.json(
		{
			success: false,
			errors: [{ code: 7000, message: "Internal Server Error" }],
		},
		500,
	);
});

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/doc",
	schema: {
		info: {
			title: "My Awesome API",
			version: "2.0.0",
			description: "This is the documentation for my awesome API.",
		},
	},
});

openapi.use("/*", cors({
	origin: '*', // 指定允许的来源
  	allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的方法
  	allowHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  	credentials: true, // 如果需要发送 Cookie
}));

// // Register Tasks Sub router
// openapi.route("/tasks", tasksRouter);

// // Register other endpoints
// openapi.post("/dummy/:slug", DummyEndpoint);

//跳转
openapi.get("/games/enter", GamesEnterEndpoint);


openapi.route("/v1", FbV1Router);

// Export the Hono app
export default app;
