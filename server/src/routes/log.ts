import { join } from 'path';
import { Hono } from "hono";
import { readFile } from 'fs/promises';
import { settings } from "@/config/settings";

const logRouter = new Hono();

logRouter.get("/", async (c) => {
    try {
        const log_path = settings.LOG_PATH;
        const fileContent = await readFile(log_path, 'utf-8');

        c.header('Content-Disposition', `attachment; filename="server.log"`);
        c.header('Content-Type', 'text/plain');

        return c.body(fileContent);
    } catch (error) {
        return c.text('Log file not found', 404);
    }
});

export default logRouter;
