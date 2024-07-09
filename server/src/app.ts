
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger"; 
import { serveStatic } from "hono/bun";

import testRouter from "./routes/test";
import authRouter from "./routes/auth";
import { customLogger } from "./logs";
import logRouter from "./routes/log";
import { handleUser } from "./auth/manager";

const app = new Hono();

app.use(csrf());
app.get("*", logger(customLogger));

app.use(
  cors({
    origin: "*",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", serveStatic({ root: "./client/dist" }));
app.use("*", serveStatic({ path: "./client/dist/index.html " }));

const apiRoutes = app.basePath("/api")
  .route('/download/log', logRouter)
  .route('/test', testRouter)
  .route('/auth', authRouter)

export default app;
export const GET = apiRoutes.fetch;
export const POST = apiRoutes.fetch;
export type AppType = typeof apiRoutes;
