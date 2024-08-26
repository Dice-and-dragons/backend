import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schemas/dbSchema.ts",
  out: "./migrations",
  dbCredentials: {
    host: "autorack.proxy.rlwy.net",
    port: 10119,
    user: "postgres",
    password: "UapGytNpgWCrLbqJmQgxrbTskUtwPsDP",
    database: "railway",
    ssl: { rejectUnauthorized: false },
  },
});
