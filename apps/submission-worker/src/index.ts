import "dotenv/config";
import { boss } from "./boss";
import { triggerCI } from "./workflow";
import { db } from "./db";
import { submission } from "@repo/db";

async function startJudgeWorker() {
  await boss.start();

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
      await triggerCI({
        submissionId: newSubmission?.id!,
        code: newSubmission?.prLinkL!,
        challengeId: newSubmission?.challengeId!,
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
