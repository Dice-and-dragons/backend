import { characters, history } from "@/schemas/dbSchema";
import { CharacterType, PositionType } from "@/schemas/types";
import { db } from "@/utils/database";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export class CharacterDao {
  constructor() {}

  public static createCharacter = async (characterData: CharacterType, userId: string) => {
    const character = {
      id: randomUUID(),
      characterData: characterData,
      userId: userId
    };
    await db.insert(characters).values(character).execute();
    return character.id;
  };

  public static addToField = async (id: string, position: PositionType) => {
    await db
      .update(characters)
      //@ts-ignore
      .set({ position: position })
      .where(eq(characters.id, id))
      .execute();
  };

  public static moveToPosition = async (
    id: string,
    newPosition: PositionType
  ) => {
    await db
      .update(characters)
      //@ts-ignore
      .set({ position: newPosition })
      .where(eq(characters.id, id))
      .execute();
  };

  public static removeFromTable = async (id: string) => {
    await db
      .update(characters)
      //@ts-ignore
      .set({ position: null })
      .where(eq(characters.id, id))
      .execute();
  };

  public static updateCharacter = async (
    id: string,
    characterData: CharacterType
  ) => {
    await db
      .update(characters)
      //@ts-ignore
      .set({ characterData: characterData })
      .where(eq(characters.id, id))
      .execute();
  };

  public static deleteCharacter = async (id: string) => {
    await db.delete(characters).where(eq(characters.id, id));
  };
}
