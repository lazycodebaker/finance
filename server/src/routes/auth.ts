
import { handleLogin, handleUser } from "@/auth/manager";
import { Hono } from "hono";

const authRouter = new Hono();

authRouter.get("/login", async (c) => {

  const username = "lazycodebaker";
  const password = "Lazycodebaker@14";

  const success = await handleLogin(c, {
    username: username,
    password: password,
  });

  if (success) {
    return c.json({
      message: "Login successful",
    }, 200);
  } else {
    return c.json({
      message: "Invalid credentials",
    }, 401);
  };
});

authRouter.get("/register", async (c) => {
  // return c.redirect(registerUrl.toString());
});

authRouter.get("/logout", async (c) => {
  //const logoutUrl = await kindeClient.logout(sessionManager(c));
  //  return c.redirect(logoutUrl.toString());
});

authRouter.get("/user", handleUser, async (c) => {
  const user = c.var.user;
  return c.json({ ok: true, data: user });
});

export default authRouter;
/* 
authRouter.get("/user", getUser, async (c) => {
  const user = c.var.user;
  return c.json({ user }, 200);
});



type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);
    if (!isAuthenticated) {
      return c.json({ error: "Unauthorized" }, 401);
    };
    const user = await kindeClient.getUserProfile(manager); 
    c.set("user", user);
    await next();
  } catch (e) {
    console.error(e);
    return c.json({ error: "Unauthorized" }, 401);
  }
});
*/
