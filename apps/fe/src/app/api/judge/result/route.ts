import { eq, and, submission, leaderboard } from "@repo/db";
import { db } from "../../../../lib/db";
import { sql } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();

  const { submissionId, results } = body;

  const scoreParts = results.split("/");
  const isPassed = scoreParts[0] === scoreParts[1];

  const [updatedSubmission] = await db
    .update(submission)
    .set({
      status: isPassed ? "PASSED" : "FAILED",
      score: isPassed ? 1 : 0,
    })
    .where(eq(submission.id, submissionId))
    .returning({
      userId: submission.userId,
      contestId: submission.contestId,
      challengeId: submission.challengeId,
    });

  if (!isPassed || !updatedSubmission) {
    return Response.json({ ok: true });
  }

  const { userId, contestId, challengeId } = updatedSubmission;

  const alreadySolved = await db.query.submission.findFirst({
    where: and(
      eq(submission.userId, userId),
      eq(submission.contestId, contestId),
      eq(submission.challengeId, challengeId),
      eq(submission.status, "PASSED"),
    ),
  });

  if (alreadySolved && alreadySolved.id !== submissionId) {
    return Response.json({ ok: true });
  }

  await db
    .insert(leaderboard)
    .values({
      contestId,
      userId,
      score: 1,
    })
    .onConflictDoUpdate({
      target: [leaderboard.contestId, leaderboard.userId],
      set: {
        score: sql`${leaderboard.score} + 1`,
      },
    });

  return Response.json({ ok: true });
}
