
import { settings } from "@/config/settings";
import jwt from "jsonwebtoken";

export const generateToken = async (user_id: string) : Promise<string> => {
    const token = await jwt.sign({ user_id }, settings.auth.JWT_SECRET as string, { algorithm: "HS256" })
    return token;
};

export const tokenVerify = async (token: string): Promise<string> => {
    if (token.length < 1) return '';
    let user_id = "";
    jwt.verify(token, settings.auth.JWT_SECRET as string, (err: any, decoded: any) => {
        if (err) console.log(err)
        user_id = decoded?.user_id
    });
    return user_id;
};