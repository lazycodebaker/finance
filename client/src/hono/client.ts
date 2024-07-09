
import { type AppType } from "@server/src/app";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:8000/");
export const api = client.api;