import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schemas/dbSchema.ts",
  out: "./migrations",
  dbCredentials: {
    host: "dnd-db-stack-dev-dbinstance-jpzjxchlei3h.crcgoa4wie4d.eu-central-1.rds.amazonaws.com",
    port: 5432,
    user: "dnddb",
    password: "xu5JY4do8A6S15rGr{)vJ){4Y*6l",
    database: "dev_dnd_db_stack",
    ssl: { rejectUnauthorized: false },
  },
});
