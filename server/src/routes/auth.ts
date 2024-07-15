
import { handleLogin, handleLogout, handleRegister, handleUser } from "@/auth/manager";
import { responseFunc } from "@/helper/response";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const authRouter = new Hono();

const userCredentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

authRouter.post("/login", zValidator("form", userCredentialsSchema), async (c) => {
  const { username, password } = await userCredentialsSchema.parseAsync(await c.req.parseBody());
  const success = await handleLogin(c, {
    username: username,
    password: password,
  });

  if (success) {
    return responseFunc({ message: "Login Successful", status: 200 });
  } else {
    return responseFunc({ message: "Login Failed", status: 401 });
  };
});

authRouter.get("/register", zValidator("form", userCredentialsSchema), async (c) => {
  const { username, password } = await userCredentialsSchema.parseAsync(await c.req.parseBody());
  const success = await handleRegister(c, {
    username: username,
    password: password,
  });

  if (success) {
    return responseFunc({ message: "Register Successful", status: 200 });
  } else {
    return responseFunc({ message: "Register Failed", status: 401 });
  }
});

authRouter.get("/logout", handleUser, async (c) => {
  const success = await handleLogout(c);
  if (success) {
    return responseFunc({ message: "Logout Successful", status: 200 });
  } else {
    return responseFunc({ message: "Logout Failed", status: 401 });
  }
});

authRouter.get("/user", handleUser, async (c) => {
  const user = c.var.user;
  return c.json({ ok: true, data: user });
});

export default authRouter;