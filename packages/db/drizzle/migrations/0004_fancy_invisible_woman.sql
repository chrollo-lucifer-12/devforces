CREATE TABLE "registration" (
	"userId" text NOT NULL,
	"contestId" text NOT NULL,
	"isParticipating" boolean
);
--> statement-breakpoint
ALTER TABLE "registration" ADD CONSTRAINT "registration_contestId_contest_id_fk" FOREIGN KEY ("contestId") REFERENCES "public"."contest"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registration" ADD CONSTRAINT "registration_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;