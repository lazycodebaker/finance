
import { z } from "zod";

export const envSchema = z.object({
    PORT: z.number(),
    TURSO_DATABASE_URL: z.string(),
    TURSO_AUTH_TOKEN: z.string(),
    JWT_SECRET: z.string(),
});

export const authCredentials = z.object({
    username: z.string(),
    password: z.string().min(8),
});

export type TEnv = z.infer<typeof envSchema>;
export type TAuthCredentials = z.infer<typeof authCredentials>;