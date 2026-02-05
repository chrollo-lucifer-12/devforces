import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { db } from "../../../lib/db";
import { submission } from "@repo/db";
import { customAlphabet } from "nanoid";
import { boss } from "../../../lib/boss";
const nanoid = customAlphabet("1234567890abcdef", 8);

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const solution = body.code as string;
    const challengeId = body.challenge as string;
    const contestId = body.contest as string;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not logged in" });
    }

    const userId = session.user.id;

    const [newSubmission] = await db
      .insert(submission)
      .values({
        challengeId: challengeId,
        userId,
        prLinkL: solution,
        contestId,
        id: nanoid(),
        updatedAt: new Date().toISOString(),
      })
      .returning();

    await boss.send("submission-queue", { id: newSubmission?.id });

    return NextResponse.json({
      success: true,
      submission,
      status: "queued",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
