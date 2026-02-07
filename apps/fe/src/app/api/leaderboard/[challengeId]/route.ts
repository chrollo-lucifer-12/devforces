import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { desc, eq, leaderboard, sql } from "@repo/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> },
) => {
  const { challengeId } = await params;

  const top10 = await db
    .select({
      userId: leaderboard.userId,
      score: leaderboard.score,
      rank: sql<number>`RANK() OVER (ORDER BY ${leaderboard.score} DESC)`,
    })
    .from(leaderboard)
    .where(eq(leaderboard.contestId, challengeId))
    .orderBy(desc(leaderboard.score), leaderboard.createdAt)
    .limit(10);

  return NextResponse.json({ top10 });
};
