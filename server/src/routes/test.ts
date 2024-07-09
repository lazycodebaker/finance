import { handleUser } from "@/auth/manager";
import { hashGenerate, verifyPassword } from "@/helper/hash";
import { Hono } from "hono";

const testRouter = new Hono();

testRouter.get("/", async (c) => {
    return c.json({ ok: true, message: "hello world from test" });
});

export default testRouter;
