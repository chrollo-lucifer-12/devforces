"use server";

import { CreateContestInput, createContestSchema } from "../lib/types";
import { db } from "../lib/db";
import { admin, contest, count, eq } from "@repo/db";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 8);

export const createContest = async (data: CreateContestInput) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/auth/sign-in");
  }
  const userId = session.user.id;

  const [isAdmin] = await db
    .select({ count: count() })
    .from(admin)
    .where(eq(admin.userId, userId));

  if (!isAdmin || !isAdmin?.count) {
    redirect("/auth/sign-in");
  }
  const validateSchema = createContestSchema.safeParse({
    name: data.name,
  });

  if (!validateSchema.success) {
    throw new Error(validateSchema.error.flatten().formErrors.join(", "));
  }

  const { name } = validateSchema.data;

  try {
    const [newContest] = await db
      .insert(contest)
      .values({
        creatorId: session.user.id,
        gitUrl: "",
        name,
        id: nanoid(),
        status: "DRAFT",
      })
      .returning();

    return { id: newContest?.id, name: newContest?.name };
  } catch (err) {
    console.error(err);
    throw new Error("Internal Server Error");
  }
};

export const updateContest = async (data: { gitUrl: string; id: string }) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      redirect("/auth/sign-in");
    }

    const userId = session.user.id;
    const [isAdmin] = await db
      .select({ count: count() })
      .from(admin)
      .where(eq(admin.userId, userId));

    if (!isAdmin || !isAdmin?.count) {
      redirect("/auth/sign-in");
    }

    await db
      .update(contest)
      .set({
        gitUrl: data.gitUrl,
      })
      .where(eq(contest.id, data.id));
  } catch (err) {
    throw new Error("");
  }
};
