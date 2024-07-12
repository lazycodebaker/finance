
import { type AppType } from "@server/src/app";
import { hc } from "hono/client";

const client = hc<AppType>("https://finance-lk3e.onrender.com/");
export const api = client.api;