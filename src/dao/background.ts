import { characterPositions, characters, history } from "@/schemas/dbSchema";
import { CharacterType, PositionType } from "@/schemas/types";
import { db } from "@/utils/database";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";

export class BackgroundDao {
  constructor() {}
  
}