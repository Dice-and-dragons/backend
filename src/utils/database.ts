import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const postgresClient = postgres({
	host: '',
	port: 5432,
	user: '',
	password: '',
	database: '',
	ssl: { rejectUnauthorized: false },
});

export const db = drizzle(postgresClient);