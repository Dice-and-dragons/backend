import { Pool } from 'pg';
import { userProfile } from '../schemas/userProfileSchema';
import { users } from '../schemas/userSchema';
import { config } from 'dotenv';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

config();
const defaultPfp = process.env.DEFAULT_AVATAR || '';

export class UserProfileRepository {
    public db: NodePgDatabase;
    public defaultPfp: string = defaultPfp;

    constructor() {
        const pool = new Pool({
            connectionString: "postgresql://postgres:123qwe456@localhost:5432/DiceAndDragons",
        });
        this.db = drizzle(pool);
    }

    public async createProfile(username: string) {
        try {
            await this.db.insert(userProfile).values({ username, pfp: this.defaultPfp }).execute();
        } catch (err: any) {
            throw new Error(`Error creating user: ${err.message}`);
        }
    }

    public async updateProfilePicture(username: string, pfp: string) {
        try {
            await this.db.update(userProfile).set({ pfp }).where(eq(userProfile.username, username)).execute();
        } catch (err: any) {
            throw new Error(`Error updating user profile: ${err.message}`);
        }
    }

    public async updateUsername (newUsername: string, oldUsername: string) {
        try {
            await this.db.update(userProfile).set({ username: newUsername }).where(eq(userProfile.username, oldUsername)).execute();
            await this.db.update(users).set({ username: newUsername }).where(eq(users.username, oldUsername)).execute();
        } catch (err: any) {
            throw new Error(`Error updating username: ${err.message}`);
        }
    }

    public async updateEmail (username: string, email: string) {
        try {
            await this.db.update(users).set({ email }).where(eq(users.username, username)).execute();
        } catch (err: any) {
            throw new Error(`Error updating email: ${err.message}`);
        }
    }

    public async updatePassword (username: string, password: string) {
        try {
            await this.db.update(users).set({ password }).where(eq(users.username, username)).execute();
        } catch (err: any) {
            throw new Error(`Error updating password: ${err.message}`);
        }
    }

    public async getProfile(username: string) {
        try {
            const profile = await this.db.select().from(userProfile).where(eq(userProfile.username, username)).execute();
            return profile[0];
        } catch (err: any) {
            throw new Error(`Error getting user profile: ${err.message}`);
        }
    }   

}