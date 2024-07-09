
import { TEnv } from "./types";

declare module "bun" {
  interface Env extends TEnv { }
}

