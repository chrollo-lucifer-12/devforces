ALTER TABLE "challenge" ADD COLUMN "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "challenge" ADD COLUMN "updatedAt" timestamp(3) NOT NULL;