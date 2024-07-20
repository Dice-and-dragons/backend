import { characters, history } from "@/schemas/dbSchema";
import { CharacterType, PositionType } from "@/schemas/types";
import { db } from "@/utils/database";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export class CharacterDao {
  constructor() {}

  public static createCharacter = async (characterData: CharacterType) => {
    const character = {
      id: "1",
      characterData: characterData,
    };
    await db.insert(characters).values(character).execute();
    return character.id;
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

  public static updateCharacter = async (characterData: CharacterType) => {};

  public static deleteCharacter = async (id: string) => {};
}
