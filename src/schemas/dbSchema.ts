import {
  pgTable,
  text,
  timestamp,
  varchar,
  json,
  integer,
} from "drizzle-orm/pg-core";
import {
  PositionType,
  CharacterType,
  SizeType,
  RoomsType,
} from "@schemas/types";

// Users Table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 32 }),
  image: text("image"),
  rooms: json("rooms").$type<RoomsType>(),
});

// Messages Table
export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  time: timestamp("time"),
  text: text("text"),
});

// Backgrounds Table
export const backgrounds = pgTable("backgrounds", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 32 }),
  image: text("image"),
});

// Characters Table
export const characters = pgTable("characters", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  characterData: json("character_data").$type<CharacterType>(),
});

// Character Positions Table (Junction Table)
export const characterPositions = pgTable("character_positions", {
  id: text("id").primaryKey(),
  characterId: text("character_id").references(() => characters.id),
  backgroundId: text("background_id").references(() => backgrounds.id),
  position: json("position").$type<PositionType>(),
});

// History Table
export const history = pgTable("history", {
  id: text("id").primaryKey(),
  characterId: text("character_id").references(() => characters.id),
  backgroundId: text("background_id").references(() => backgrounds.id),
  positionFrom: json("position_from").$type<PositionType>(),
  positionTo: json("position_to").$type<PositionType>(),
  time: timestamp("time"),
});

// Room Settings Table
export const roomSettings = pgTable("room_settings", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 32 }),
  deckSize: json("deck_size").$type<SizeType>(),
  image: text("image"),
});
