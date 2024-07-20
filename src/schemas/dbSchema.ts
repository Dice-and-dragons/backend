import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  json,
  varchar,
  smallint,
} from "drizzle-orm/pg-core";
import {
  PositionType,
  CharacterType,
  SizeType,
  RoomsType,
} from "@schemas/types";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 32 }),
  image: text("image"),
  rooms: json("rooms").$type<RoomsType>(),
});

export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  time: timestamp("time"),
  text: text("text"),
});

export const background = pgTable("backgrounds", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 32 }),
  image: text("image"),
});

export const characters = pgTable("characters", {
  id: text("id").primaryKey(),
  position: json("position").$type<PositionType>(),
  characterData: json("character_data").$type<CharacterType>(),
});

export const history = pgTable("history", {
  id: text("id").primaryKey(),
  characterId: text("character_id").references(() => characters.id),
  positionFrom: json("position_from").$type<PositionType>(),
  positionTo: json("position_to").$type<PositionType>(),
  time: timestamp("time"),
});

export const roomSettings = pgTable("roomSettings", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 32 }),
  deckSize: json("deck_size").$type<SizeType>(),
  image: text("image"),
});
