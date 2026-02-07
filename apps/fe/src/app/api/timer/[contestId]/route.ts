import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { contest, eq } from "@repo/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ contestId: string }> },
) => {
  const { contestId } = await params;

  const [foundContest] = await db
    .select({
      endTime: contest.endDate,
    })
    .from(contest)
    .where(eq(contest.id, contestId));

  if (!foundContest) {
    return NextResponse.json({ error: "Contest not found" }, { status: 404 });
  }

  const now = new Date();
  const end = new Date(foundContest.endTime as string);

  const timeLeft = Math.max(0, end.getTime() - now.getTime());

  return NextResponse.json({ timeLeft });
};
