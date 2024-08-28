import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

function ensureEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schemas/dbSchema.ts",
  out: "./migrations",
  dbCredentials: {
    host: ensureEnvVar("DB_HOST"),
    port: parseInt(ensureEnvVar("DB_PORT")),
    user: ensureEnvVar("DB_USER"),
    password: ensureEnvVar("DB_PASSWORD"),
    database: ensureEnvVar("DB"),
    ssl: { rejectUnauthorized: false },
  },
});
