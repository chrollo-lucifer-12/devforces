import { auth } from "../../../../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "../../../../lib/db";
import { and, challenge, contest, eq, submission } from "@repo/db";
import LiveChallenge from "../../../../components/live-challenge";

const ContestPage = async ({
  params,
}: {
  params: Promise<{ contestId: string }>;
}) => {
  const { contestId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.session || !session.user) {
    redirect("/auth/sign-in");
  }

  const userId = session.user.id;

  const [contestName] = await db
    .select({
      name: contest.name,
    })
    .from(contest)
    .where(eq(contest.id, contestId));

  const challenges = await db
    .select()
    .from(challenge)
    .where(
      and(eq(challenge.contestId, contestId), eq(challenge.isHidden, false)),
    );

  const successfulSubmissions = await db
    .select()
    .from(submission)
    .where(
      and(eq(submission.contestId, contestId), eq(submission.userId, userId)),
    );

  const solvedChallengeIds = new Set(
    successfulSubmissions
      .filter((sub) => sub.score === 1)
      .map((sub) => sub.challengeId),
  );

  const problems = challenges.map((ch) => ({
    id: ch.id,
    name: ch.name,
    solved: solvedChallengeIds.has(ch.id),
  }));

  return (
    <LiveChallenge
      contestId={contestId}
      contestName={contestName?.name!}
      problems={problems}
    />
  );
};

export default ContestPage;
