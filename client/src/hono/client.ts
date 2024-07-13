
import { type AppType } from "@server/src/app";
import { Hono } from "hono";
import { hc } from "hono/client";

type HonoClient<T extends Hono> = typeof hc<T>;

const client = hc<AppType>("/") as HonoClient<AppType>
export const api = client.api
