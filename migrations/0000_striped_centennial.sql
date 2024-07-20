CREATE TABLE IF NOT EXISTS "backgrounds" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(32),
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"id" text PRIMARY KEY NOT NULL,
	"position" json NOT NULL,
	"character_data" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "history" (
	"id" text PRIMARY KEY NOT NULL,
	"character_id" text,
	"position_from" json,
	"position_to" json,
	"time" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"time" timestamp,
	"text" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roomSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(32),
	"deck_size" json,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(32),
	"image" text,
	"rooms" json
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "history" ADD CONSTRAINT "history_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
