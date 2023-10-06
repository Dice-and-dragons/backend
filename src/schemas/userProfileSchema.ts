import { pgTable, serial, varchar, text } from 'drizzle-orm/pg-core';

export type UserProfileSchema = {
    username: string,
    pfp: string
};

export const userProfile = pgTable ('users_base64_pfp', {
    id: serial('id').notNull(),
    username: varchar('username', {length:15}).notNull().unique(),
    pfp: text('pfp').notNull()
});