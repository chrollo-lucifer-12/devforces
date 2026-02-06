import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { eq, submission } from "@repo/db";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const submissionId = searchParams.get("id");

  if (!submissionId) {
    return NextResponse.json(
      { error: "submission id missing " },
      { status: 400 },
    );
  }

  const s = await db
    .select({ status: submission.status })
    .from(submission)
    .where(eq(submission.id, submissionId));

  return NextResponse.json({ status: s[0]?.status }, { status: 200 });
};
