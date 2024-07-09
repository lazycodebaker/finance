import { handleUser } from "@/auth/manager";
import { hashGenerate, verifyPassword } from "@/helper/hash"; 
import { Hono } from "hono";

const testRouter = new Hono();

testRouter.get("/", handleUser , async (c) => {
    const user = c.var.user;

    if(!user) return c.json({ ok: false, message: "Un-Authorised" });
    return c.json({ ok: true, message: "hello world from test" });
});

export default testRouter;
