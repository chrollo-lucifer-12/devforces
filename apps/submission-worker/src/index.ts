import "dotenv/config";
import { triggerCI } from "./workflow";
import { challenge, contest, eq, submission } from "@repo/db";
import { createBoss } from "@repo/boss/boss";
import { db } from "./db";

async function startJudgeWorker() {
  const boss = await createBoss(process.env.DATABASE_URL!);
  await boss.start();

  await boss.createQueue("submission-queue");

  await boss.work("submission-queue", async ([job]) => {
    const { id } = job?.data as { id: string };

    console.log("🚀 Judging", id);

    try {
      const [newSubmission] = await db
        .update(submission)
        .set({
          status: "RUNNING",
        })
        .returning();

      const challengeId = newSubmission?.challengeId as string;
      const [getChallenge] = await db
        .select({ name: challenge.name, contestId: challenge.contestId })
        .from(challenge)
        .where(eq(challenge.id, challengeId));

      const [getContest] = await db
        .select({ repo: contest.gitUrl })
        .from(contest)
        .where(eq(contest.id, getChallenge?.contestId!));

      await triggerCI({
        code: newSubmission?.prLinkL!,
        repo: getContest?.repo!,
        challenge_name: getChallenge?.name!,
      });
    } catch (err) {
      console.error(err);
      await db.update(submission).set({
        status: "FAILED",
      });
    }
  });

  console.log("Judge worker running...");
}

startJudgeWorker();
