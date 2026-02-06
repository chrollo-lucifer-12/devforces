import { challenge, eq } from "@repo/db";
import ChallengeEditor from "../../../../../components/live-challenge/challenge-editor";
import { db } from "../../../../../lib/db";

export function githubBlobToRaw(url: string): string {
  try {
    const parsed = new URL(url);

    if (parsed.hostname !== "github.com") {
      throw new Error("Not a GitHub URL");
    }

    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts.length < 5 || parts[2] !== "blob") {
      throw new Error("Invalid GitHub blob URL");
    }

    const [owner, repo, , branch, ...filePath] = parts;

    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath.join("/")}`;
  } catch (error) {
    throw new Error("Invalid URL");
  }
}

const ChallengePage = async ({
  params,
}: {
  params: Promise<{ challengeId: string; contestId: string }>;
}) => {
  const { challengeId, contestId } = await params;

  const [challengeStatement] = await db
    .select({ statementUrl: challenge.statementLink })
    .from(challenge)
    .where(eq(challenge.id, challengeId));

  const rawUrl = githubBlobToRaw(challengeStatement?.statementUrl!);

  const response = await fetch(rawUrl, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch markdown");
  }

  const markdown = await response.text();

  return (
    <ChallengeEditor
      markdown={markdown}
      challengeId={challengeId}
      contestId={contestId}
    />
  );
};

export default ChallengePage;
