import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const postgresClient = postgres({
  host: "autorack.proxy.rlwy.net",
  port: 10119,
  user: "postgres",
  password: "UapGytNpgWCrLbqJmQgxrbTskUtwPsDP",
  database: "railway",
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(postgresClient);
