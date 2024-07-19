import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const postgresClient = postgres({
	host: 'dnd-db-stack-dev-dbinstance-jpzjxchlei3h.crcgoa4wie4d.eu-central-1.rds.amazonaws.com',
	port: 5432,
  user: 'dnddb',
  password: 'xu5JY4do8A6S15rGr{)vJ){4Y*6l',
	database: 'dev_dnd_db_stack',
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(postgresClient);