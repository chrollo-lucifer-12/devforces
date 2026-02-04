CREATE TYPE "public"."registration_status" AS ENUM('REGISTERED', 'PARTICIPATING');--> statement-breakpoint
ALTER TABLE "registration" RENAME COLUMN "isParticipating" TO "status";