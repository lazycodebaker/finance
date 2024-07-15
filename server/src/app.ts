
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import testRouter from "./routes/test";
import authRouter from "./routes/auth";
import { customLogger } from "./logs";
import logRouter from "./routes/log";
import incomeRouter from "./routes/income";
import expenseRouter from "./routes/expense";
import budgetRouter from "./routes/budget";

const app = new Hono();

// app.use(csrf());

// app.get("*", logger(customLogger));

app.use(cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  credentials: true,
  allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
}));

const apiRoutes = app.basePath("/api")
  .route("/income", incomeRouter)
  .route('/expense', expenseRouter)
  .route('/budget', budgetRouter)
  .route('/download/log', logRouter)
  .route('/test', testRouter)
  .route('/auth', authRouter)

app.use("*", serveStatic({ root: "./client/dist" }));
app.use("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
export type AppType = typeof apiRoutes;

