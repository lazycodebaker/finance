
import os from "os";
import path from "path";

const log_path = path.join(__dirname, '..', 'logs', 'server.log');

export const settings = {
  PORT: Number(Bun.env.PORT),
  LOG_PATH: log_path,
  auth: {
    JWT_SECRET: process.env.JWT_SECRET
  }
};
