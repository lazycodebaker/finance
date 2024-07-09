
import { settings } from "@/config/settings";
import fs from "fs";

export const customLogger = (message: string) => {
    const logPath = settings.LOG_PATH;
    if (!fs.existsSync(logPath)) {
        fs.writeFileSync(logPath, "");
    };
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`);
};
