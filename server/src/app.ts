
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import testRouter from "./routes/test";
import authRouter from "./routes/auth";
import { customLogger } from "./logs";
import logRouter from "./routes/log";

const app = new Hono();

app.use(csrf());
app.get("*", logger());

app.use(cors({
  origin : "*",
  allowHeaders : ["Content-Type", "Authorization", "X-CSRF-Token"],
  credentials : true,
  allowMethods : ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
}));

const apiRoutes = app.basePath("/api")
  .route('/download/log', logRouter)
  .route('/test', testRouter)
  .route('/auth', authRouter)

app.use("*", serveStatic({ root: "./client/dist" }));
app.use("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
export const GET = apiRoutes.fetch;
export const POST = apiRoutes.fetch;
export type AppType = typeof apiRoutes;
