
import { Context } from "hono";

import { v4 } from "uuid";
import { TUser, userSchema, userTable } from "@/drizzle/schemas";
import { deleteCookie, getCookie, setCookie } from "@/helper/cookie";
import { TAuthCredentials } from "@/config/types";
import { hashGenerate, verifyPassword } from "@/helper/hash";
import { db } from "@/db/client";
import { generateToken, tokenVerify } from "@/auth/jwt";
import { createMiddleware } from "hono/factory";
import { responseFunc } from "@/helper/response";
import { eq } from "drizzle-orm";

export const handleLogin = async (c: Context, authCredentials: TAuthCredentials): Promise<boolean> => {
    try {
        const { password, username } = authCredentials;

        const _user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.username, username));

        if (!_user) return false;

        const user = _user[0] as TUser;

        const valid = await verifyPassword({ user, password });
        if (!valid) return false;

        const cookie = await getCookie(c, "token");
        if (cookie) {
            await deleteCookie(c, "token");
        };

        const token = await generateToken(user._id);
        await setCookie(c, "token", token);

        const _user_updated = await db
            .update(userTable)
            .set({ is_logged: true })
            .where(eq(userTable._id, user._id));

        if (!_user_updated) return false;

        if (!user) return false;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const handleLogout = async (c: Context): Promise<boolean> => {
    try {
        const user = await userSchema.parseAsync(c.get("user"));

        const _user = await db
            .update(userTable)
            .set({ is_logged: false })
            .where(eq(userTable._id, user._id));

        if (!_user) return false;

        const cookie = await getCookie(c, "token");
        if (!cookie) return false;

        await deleteCookie(c, "token");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const handleRegister = async (c: Context, authCredentials: TAuthCredentials): Promise<boolean> => {
    try {
        const { password, username } = authCredentials;

        const _user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.username, username));

        if (_user) return false

        const hashed_token = await hashGenerate(password);

        const user_id = v4();

        const user: TUser = {
            _id: user_id,
            username: username,
            password: hashed_token,
            is_logged: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await db.insert(userTable).values(user);

        const token = await generateToken(user_id);
        await setCookie(c, "token", token);

        return true;
    } catch (error) {
        return false;
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
        if (!token) return responseFunc({ message: "Token Not Found", status: 401 });

        const user_id = await tokenVerify(token);
        if (!user_id) return responseFunc({ message: "Invalid Token", status: 401 });

        const user = (await db.select().from(userTable).where(eq(userTable._id, user_id)))[0];
        if (!user) return responseFunc({ message: "User Not Found", status: 401 });

        c.set("user", user);
        await next();
    } catch (error) {
        return responseFunc({ message: "Error Getting User", status: 500 });
    }
});