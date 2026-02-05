import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";
import { challenge, test } from "@repo/db";
import { customAlphabet } from "nanoid";
import { z } from "zod";
import { eq, and, inArray } from "drizzle-orm";

const nanoid = customAlphabet("1234567890abcdef", 8);

const challengeSchema = z.object({
  name: z.string().min(1),
  statementPath: z.string().min(1),
  testPaths: z.array(z.string()).min(1),
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

    await db.transaction(async (tx) => {
      const existingChallenges = await tx
        .select()
        .from(challenge)
        .where(eq(challenge.contestId, contestId));

      const existingMap = new Map(existingChallenges.map((c) => [c.name, c]));

      const incomingNames = new Set(challenges.map((c) => c.name.trim()));

      const challengesToDelete = existingChallenges
        .filter((c) => !incomingNames.has(c.name))
        .map((c) => c.id);

      if (challengesToDelete.length) {
        // delete tests first
        await tx
          .delete(test)
          .where(inArray(test.challengeId, challengesToDelete));

        await tx
          .delete(challenge)
          .where(inArray(challenge.id, challengesToDelete));
      }

      const challengeIdMap = new Map<string, string>();

      for (const ch of challenges) {
        const name = ch.name.trim();
        const statementLink = ch.statementPath.trim();

        const existing = existingMap.get(name);

        if (existing) {
          // update
          await tx
            .update(challenge)
            .set({ statementLink })
            .where(eq(challenge.id, existing.id));

          challengeIdMap.set(name, existing.id);
        } else {
          const id = nanoid();

          await tx.insert(challenge).values({
            id,
            contestId,
            name,
            statementLink,
          });

          challengeIdMap.set(name, id);
        }
      }

      for (const ch of challenges) {
        const challengeId = challengeIdMap.get(ch.name.trim())!;

        const existingTests = await tx
          .select()
          .from(test)
          .where(eq(test.challengeId, challengeId));

        const existingLinks = new Set(existingTests.map((t) => t.testLink));

        const incomingLinks = new Set(ch.testPaths.map((t) => t.trim()));

        const testsToDelete = existingTests
          .filter((t) => !incomingLinks.has(t.testLink))
          .map((t) => t.id);

        if (testsToDelete.length) {
          await tx.delete(test).where(inArray(test.id, testsToDelete));
        }
        const testsToInsert = ch.testPaths
          .map((t) => t.trim())
          .filter((link) => !existingLinks.has(link))
          .map((link) => ({
            id: nanoid(),
            challengeId,
            testLink: link,
          }));

        if (testsToInsert.length) {
          await tx.insert(test).values(testsToInsert);
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Create challenges error:", err);
    return NextResponse.json(
      { error: "Failed to sync challenges" },
      { status: 500 },
    );
  }
};
