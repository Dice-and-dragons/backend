import { characterPositions, characters, history } from "@/schemas/dbSchema";
import { CharacterType, PositionType } from "@/schemas/types";
import { db } from "@/utils/database";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";

export class CharacterDao {
  constructor() {}

  public static createCharacter = async (
    characterData: CharacterType,
    userId: string
  ) => {
    const character = {
      id: randomUUID(),
      characterData: characterData,
      userId: userId,
    };
    await db.insert(characters).values(character).execute();
    return character.id;
  };

  public static addToField = async (
    characterId: string,
    backgroundId: string,
    position: PositionType
  ) => {
    const characterPosition = {
      id: randomUUID(),
      characterId: characterId,
      backgroundId: backgroundId,
      position: position,
    };
    await db.insert(characterPositions).values(characterPosition).execute();
    const historyUpdate = {
      id: randomUUID(),
      characterId: characterId,
      backgroundId: backgroundId,
      positionTo: position,
      time: new Date(),
    };
    await db.insert(history).values(historyUpdate).execute();
  };

  public static moveToPosition = async (
    characterId: string,
    backgroundId: string,
    newPosition: PositionType
  ) => {
    const previousPosition = await db
      .select()
      .from(characterPositions)
      .where(
        and(
          eq(characterPositions.characterId, characterId),
          eq(characterPositions.backgroundId, backgroundId)
        )
      );
    const historyUpdate = {
      id: randomUUID(),
      characterId: characterId,
      backgroundId: backgroundId,
      positionFrom: previousPosition[0].position,
      positionTo: newPosition,
      time: new Date(),
    };
    await db.insert(history).values(historyUpdate).execute();
    await db
      .update(characterPositions)
      //@ts-ignore
      .set({ position: newPosition })
      .where(
        and(
          eq(characterPositions.characterId, characterId),
          eq(characterPositions.backgroundId, backgroundId)
        )
      )
      .execute();
  };

  public static removeFromTable = async (
    characterId: string,
    backgroundId: string
  ) => {
    const previousPosition = await db
      .select()
      .from(characterPositions)
      .where(
        and(
          eq(characterPositions.characterId, characterId),
          eq(characterPositions.backgroundId, backgroundId)
        )
      );
    const historyUpdate = {
      id: randomUUID(),
      characterId: characterId,
      backgroundId: backgroundId,
      positionFrom: previousPosition[0].position,
      time: new Date(),
    };
    await db.insert(history).values(historyUpdate).execute();
    await db
      .delete(characterPositions)
      .where(
        and(
          eq(characterPositions.characterId, characterId),
          eq(characterPositions.backgroundId, backgroundId)
        )
      )
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
    await db.delete(characters).where(eq(characters.id, id)).execute();
  };
}
