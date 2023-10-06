import { Pool } from 'pg';
import { spells } from '../schemas/spellsScema';
import { SpellsSchema } from '../schemas/spellsScema';
import { config } from 'dotenv';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

config();

export class SpellsRepository {
    public db: NodePgDatabase;

    constructor() {
        const pool = new Pool({
            connectionString: "postgresql://postgres:123qwe456@localhost:5432/DiceAndDragons",
        });
        this.db = drizzle(pool);
    }

    public async getAllSpells() {
        try {
            const allSpells = await this.db.select().from(spells).execute();
            return allSpells;
        } catch (err: any) {
            throw new Error(`Error getting spells: ${err.message}`);
        }
    }

    public async getSpellsByType(spelltype: string) {
        try {
        const spellsByType = await this.db.select().from(spells).where(eq(spells.spelltype, spelltype)).execute();
        return spellsByType;
        } catch (err: any) {
            throw new Error(`Error getting spells: ${err.message}`);
        }
    }
    
}