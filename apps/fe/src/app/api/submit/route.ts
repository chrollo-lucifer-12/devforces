import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { db } from "../../../lib/db";
import { and, challenge, contest, eq, submission } from "@repo/db";
import { customAlphabet } from "nanoid";
import { differenceInMinutes } from "date-fns";

import z from "zod";
import { createBoss } from "@repo/boss/boss";
import { env } from "../../../lib/env/server";
import { triggerCI } from "../../../lib/workflow";
const nanoid = customAlphabet("1234567890abcdef", 8);

const schema = z.object({
  code: z.string().min(1, { error: "code cannot be empty" }),
  challengeId: z.string().min(1, { error: "challenge id cannot be empty" }),
  contestId: z.string().min(1, { error: "contest id cannot be empty" }),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const boss = await createBoss(env.DATABASE_URL);

    const parsedSchema = schema.safeParse({
      code: body.code,
      challengeId: body.challengeId,
      contestId: body.contestId,
    });

    if (!parsedSchema.success) {
      console.log(parsedSchema.error.flatten().formErrors);
      return NextResponse.json(
        { error: parsedSchema.error.flatten().formErrors },
        { status: 400 },
      );
    }

    const { challengeId, code, contestId } = parsedSchema.data;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not logged in" });
    }

    const userId = session.user.id;

    const [findSubmission] = await db
      .select({ id: submission.id, createdAt: submission.createdAt })
      .from(submission)
      .where(
        and(
          eq(submission.userId, userId),
          eq(submission.challengeId, challengeId),
        ),
      );

    if (findSubmission && findSubmission.id && findSubmission.createdAt) {
      const diff = differenceInMinutes(
        new Date(),
        new Date(findSubmission.createdAt),
      );
      if (diff < 5) {
        return NextResponse.json(
          { error: "Submission already running within the last 5 minutes" },
          { status: 400 },
        );
      }
    }

    const [newSubmission] = await db
      .insert(submission)
      .values({
        challengeId: challengeId,
        userId,
        prLinkL: code,
        contestId,
        id: nanoid(),
        updatedAt: new Date().toISOString(),
        status: "RUNNING",
      })
      .returning();

    const [findChallengeName] = await db
      .select({ name: challenge.name })
      .from(challenge)
      .where(eq(challenge.id, challengeId));

    const [findContestRepo] = await db
      .select({ repo: contest.gitUrl })
      .from(contest)
      .where(eq(contest.id, contestId));

    await triggerCI({
      code,
      repo: findContestRepo?.repo as string,
      challenge_name: findChallengeName?.name as string,
    });

    return NextResponse.json({
      success: true,
      status: "queued",
      submissionId: newSubmission?.id,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
