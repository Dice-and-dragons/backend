import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export type SpellsSchema = {
    spellname: string,
    spelltype: string,
    school: string,
    casttime: string,
    distance: string,
    duration: string,
    components: string,
    description: string,
    availableto: string
}

export const spells = pgTable ('spellslist', {
    spellname: text('spellname').notNull().unique(),
    spelltype: varchar('spelltype', {length:40}).notNull(),
    school: varchar('school', {length:40}).notNull(),
    casttime: varchar('casttime', {length:50}).notNull(),
    distance: varchar('distance', {length:30}).notNull(),
    duration: varchar('duration', {length:30}).notNull(),
    components: text('components').notNull(),
    description: text('description').notNull(),
    availableto: text('availableto').notNull()
});