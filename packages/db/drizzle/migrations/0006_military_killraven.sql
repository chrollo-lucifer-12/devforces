ALTER TABLE "challenge" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "contest" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "contest" ALTER COLUMN "startDate" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "contest" ALTER COLUMN "endDate" DROP NOT NULL;