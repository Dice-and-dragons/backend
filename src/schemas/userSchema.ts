import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export type UserSchema = {
    username: string,
    email: string,
    password: string,
    created_on: Date,
    last_login: Date,
    language: string
};


export const users = pgTable ('users', {
    id: serial('id').primaryKey().notNull(),
    username: varchar('username', {length:15}).notNull().unique(),
    email: varchar('email', {length:35}).notNull().unique(),
    password: varchar('password', {length:20}).notNull(),
    created_on: timestamp('created_on').notNull(),
    last_login: timestamp('last_login'),
    language: varchar('language', {length:5}).default('en')
});
