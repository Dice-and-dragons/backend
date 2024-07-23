CREATE TABLE IF NOT EXISTS "character_positions" (
	"id" text PRIMARY KEY NOT NULL,
	"character_id" text,
	"background_id" text,
	"position" json
);
--> statement-breakpoint
ALTER TABLE "roomSettings" RENAME TO "room_settings";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_positions" ADD CONSTRAINT "character_positions_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_positions" ADD CONSTRAINT "character_positions_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."backgrounds"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "characters" DROP COLUMN IF EXISTS "position";