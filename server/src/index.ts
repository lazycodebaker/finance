import app from "./app";
import { settings } from "./config/settings";

const server = Bun.serve({
  port: settings.PORT,
  fetch: app.fetch,
  hostname: "0.0.0.0",
});

console.log(`Server running , `, server.url.href);
