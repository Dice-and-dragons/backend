import { Pool } from 'pg';
import { UserSchema, users } from '../schemas/userSchema';
import { config } from 'dotenv';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

config();

export class UsersRepository {
    public db: NodePgDatabase;

    constructor() {
        const pool = new Pool({
            connectionString: "postgresql://postgres:123qwe456@localhost:5432/DiceAndDragons",
        });
        this.db = drizzle(pool);
    }

    public async createUser(user: UserSchema) {
        try {
            await this.db.insert(users).values(user).execute();
        } catch (err: any) {
            throw new Error(`Error creating user: ${err.message}`);
        }
    }

    public async changeLanguage(email: string, language: string) {
        try {
            await this.db.update(users).set({language}).where(eq(users.email, email)).execute();
        } catch (err: any) {
            throw new Error(`Error changing language: ${err.message}`);
        }
    }

    public async getUserByEmail(email: string) {
        try {
            const user = await this.db.select().from(users).where(eq(users.email, email)).execute();
            return user[0]; 
        } catch (err: any) {
            throw new Error(`Error getting user: ${err.message}`);
        }
    }
}
