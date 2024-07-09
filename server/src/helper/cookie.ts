import { Context } from "hono"; 

export const setCookie = (c: Context, key: string, value: string) => {
    c.header("Set-Cookie", `${key}=${value}; Max-Age=3600; HttpOnly`);
};

export const getCookie = (c: Context, key: string) => { 
    if (!c.req.header()['cookie']) return;
    const cookies = {} as Record<string, string>
    c.req.header()['cookie'].split(";").map(cookie => {
        const [key, value] = cookie.split("=")
        cookies[key] = value
    });
    return cookies[key];
};

export const deleteCookie = (c: Context, key: string) => {
    setCookie(c, key, "");
};