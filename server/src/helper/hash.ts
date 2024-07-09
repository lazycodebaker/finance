import { TUser } from '@/drizzle/schemas';
import crypto from 'crypto';

type HashGenerateType = (text: string) => Promise<string>;

export const hashGenerate: HashGenerateType = async (text) => {
    const salt = await crypto.randomBytes(16).toString('hex');
    const hash = await crypto.pbkdf2Sync(text, salt, 1000, 64, 'sha512').toString('hex');
    const hashed_token = hash + '$' + salt;
    return hashed_token;
};

type verifyPasswordArgs = {
    user: TUser
    password: string
};

export const verifyPassword = async ({ user, password }: verifyPasswordArgs): Promise<boolean> => {
    const [storedHash, storedSalt] = user?.password?.split('$')!;
    if (!storedHash || !storedSalt) return false;
    const hash = crypto.pbkdf2Sync(password, storedSalt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
};