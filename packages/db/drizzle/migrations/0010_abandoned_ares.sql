CREATE TABLE "leaderboard" (
	"contestId" text NOT NULL,
	"userId" text NOT NULL,
	"score" integer,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "leaderboard_contestId_userId_pk" PRIMARY KEY("contestId","userId")
);
--> statement-breakpoint
CREATE INDEX "leaderboard_contest_score_idx" ON "leaderboard" USING btree ("contestId","score");--> statement-breakpoint
CREATE INDEX "leaderboard_contest_user_idx" ON "leaderboard" USING btree ("contestId","userId");