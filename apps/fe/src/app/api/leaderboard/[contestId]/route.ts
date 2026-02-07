import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { desc, eq, leaderboard, sql, user } from "@repo/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ contestId: string }> },
) => {
  const { contestId } = await params;

  const top10 = await db
    .select({
      userId: leaderboard.userId,
      score: leaderboard.score,
      username: user.name,
      imageUrl: user.image,
      rank: sql<number>`RANK() OVER (ORDER BY ${leaderboard.score} DESC)`,
    })
    .from(leaderboard)
    .innerJoin(user, eq(user.id, leaderboard.userId))
    .where(eq(leaderboard.contestId, contestId))
    .orderBy(desc(leaderboard.score), leaderboard.createdAt)
    .limit(10);

  return NextResponse.json({ top10 });
};
