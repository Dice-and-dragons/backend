import { characters, history } from "@/schemas/dbSchema";
import { CharacterType, PositionType } from "@/schemas/types";
import { db } from "@/utils/database";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export class CharacterDao {
  constructor() {}

  public static createCharacter = async (characterData: CharacterType) => {
    const character = {
      id: randomUUID(),
      position: {x: -1, y: -1},
      characterData: characterData
    }
    await db.insert(characters).values(character).execute();
  }

  public static moveToPosition = async (id: string, newPosition: PositionType) => {
    await db.update(characters)
    .set({ position: newPosition })
    .where(eq(characters.id, id));
  }

  public static removeFromTable = async () => {

  }

  public static updateCharacter = async (characterData: CharacterType) => {

  }

  public static deleteCharacter = async (id: string) => {

  }
}