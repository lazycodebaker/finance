
import { Context } from "hono";

import { v4 } from "uuid";
import { TUser, userTable } from "@/drizzle/schemas";
import { deleteCookie, getCookie, setCookie } from "@/helper/cookie";
import { TAuthCredentials } from "@/config/types";
import { hashGenerate } from "@/helper/hash";
import { db } from "@/db/client";
import { generateToken, tokenVerify } from "@/auth/jwt";
import { eq } from "drizzle-orm";
import { createMiddleware } from "hono/factory";

export const handleLogin = async (c: Context, authCredentials: TAuthCredentials): Promise<boolean> => {
    try {
        const { password, username } = authCredentials;

        const hashed_token = await hashGenerate(password);

        const user_id = v4();

        const user: TUser = {
            _id: user_id,
            username: username,
            password: hashed_token,
            createAt: new Date().toISOString(),
            updateAt: new Date().toISOString(),
        };

        await db.insert(userTable).values(user);
        const token = await generateToken(user_id);
        await setCookie(c, "token", token);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const handleLogout = async (c: Context) => {
    try {

    } catch (error) {

    }
};

export const handleRegister = async (c: Context, authCredentials: TAuthCredentials) => {
    try {

    } catch (error) {

    }
};

type Env = {
    Variables: {
        user: TUser;
    };
};

export const handleUser = createMiddleware<Env>(async (c, next) => {
    try {
        const token = await getCookie(c, "token");
        if (!token) return c.json({ error: "Invalid Token" }, 401);

        const user_id = await tokenVerify(token);
        if (!user_id) return c.json({ error: "Unauthorized , User Not Found" }, 401);

        const user = (await db.select().from(userTable).where(eq(userTable._id, user_id)))[0];
        c.set("user", user);
        await next();
    } catch (error) {
        return c.json({ error: "Error Getting User" }, 401);
    }
});