CREATE TABLE "challenge" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"contestId" text NOT NULL,
	"statementLink" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contest" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"creatorId" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"status" text,
	"gitUrl" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submission" (
	"id" text PRIMARY KEY NOT NULL,
	"challengeId" text NOT NULL,
	"userId" text NOT NULL,
	"prLinkL" text NOT NULL,
	"score" integer,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test" (
	"id" text PRIMARY KEY NOT NULL,
	"challengeId" text NOT NULL,
	"testLink" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "challenge" ADD CONSTRAINT "challenges_contest_fkey" FOREIGN KEY ("contestId") REFERENCES "public"."contest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contest" ADD CONSTRAINT "contest_admin_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."admin"("userId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_challengeId_challenge_id_fk" FOREIGN KEY ("challengeId") REFERENCES "public"."challenge"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test" ADD CONSTRAINT "test_challengeId_challenge_id_fk" FOREIGN KEY ("challengeId") REFERENCES "public"."challenge"("id") ON DELETE no action ON UPDATE no action;