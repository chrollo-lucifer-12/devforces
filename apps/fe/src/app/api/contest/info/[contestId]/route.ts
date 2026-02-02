import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import {
  and,
  challenge,
  contest,
  count,
  countDistinct,
  eq,
  registration,
  submission,
} from "@repo/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ contestId: string }> },
) => {
  const { contestId } = await params;

  const [contestData] = await db
    .select({
      name: contest.name,
      startDate: contest.startDate,
      endDate: contest.endDate,
      submissionsCount: countDistinct(submission.id).as("submissionsCount"),
      participantsCount: countDistinct(registration.userId).as(
        "participantsCount",
      ),
    })
    .from(contest)
    .leftJoin(submission, eq(submission.contestId, contest.id))
    .leftJoin(
      registration,
      and(
        eq(registration.contestId, contest.id),
        eq(registration.isParticipating, true),
      ),
    )
    .where(eq(contest.id, contestId))
    .groupBy(contest.id, contest.name, contest.startDate, contest.endDate);

  return NextResponse.json(contestData);
};
