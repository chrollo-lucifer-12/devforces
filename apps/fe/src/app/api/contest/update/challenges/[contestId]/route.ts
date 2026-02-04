import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";
import { challenge, test } from "@repo/db";
import { customAlphabet } from "nanoid";
import { z } from "zod";

const nanoid = customAlphabet("1234567890abcdef", 8);

const challengeSchema = z.object({
  name: z.string().min(1, "Challenge name required"),
  statementPath: z.string().min(1, "Statement path required"),
  testPaths: z.array(z.string()).min(1, "At least one test required"),
});

const bodySchema = z.object({
  challenges: z.array(challengeSchema).min(1),
});

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ contestId: string }> },
) => {
  try {
    const { contestId } = await params;
    const rawBody = await req.json();

    const parsed = bodySchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { challenges } = parsed.data;

    const challengeData = challenges.map((c) => ({
      id: nanoid(),
      contestId,
      name: c.name.trim(),
      statementLink: c.statementPath.trim(),
    }));

    const testData = challengeData.flatMap((challenge) => {
      const originalChallenge = challenges.find(
        (c) => c.name.trim() === challenge.name,
      );
      return originalChallenge!.testPaths.map((testPath) => ({
        id: nanoid(),
        challengeId: challenge.id,
        testLink: testPath.trim(),
      }));
    });

    await db.transaction(async (tx) => {
      await tx.insert(challenge).values(challengeData);

      await tx.insert(test).values(testData);
    });

    return NextResponse.json({
      success: true,
      contestId,
      created: {
        challenges: challengeData.length,
        tests: testData.length,
      },
    });
  } catch (err) {
    console.error("Create challenges error:", err);
    return NextResponse.json(
      { error: "Failed to create challenges" },
      { status: 500 },
    );
  }
};
