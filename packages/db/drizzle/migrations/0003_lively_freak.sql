CREATE TYPE "public"."contest_status" AS ENUM('LIVE', 'UPCOMING', 'DRAFT');--> statement-breakpoint
ALTER TABLE "contest" ALTER COLUMN "status" SET DEFAULT 'DRAFT'::"public"."contest_status";--> statement-breakpoint
ALTER TABLE "contest" ALTER COLUMN "status" SET DATA TYPE "public"."contest_status" USING "status"::"public"."contest_status";--> statement-breakpoint
ALTER TABLE "contest" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contest" ADD COLUMN "startDate" timestamp(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "contest" ADD COLUMN "endDate" timestamp(3) NOT NULL;