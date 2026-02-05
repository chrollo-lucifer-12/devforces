"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import { db } from "../lib/db";
import { and, eq, registration } from "@repo/db";

export const registerContest = async (data: { contestId: string }) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      redirect("/auth/sign-in");
    }
    const userId = session.user.id;

    const [findRegistration] = await db
      .select()
      .from(registration)
      .where(
        and(
          eq(registration.userId, userId),
          eq(registration.contestId, data.contestId),
        ),
      );

    if (findRegistration) {
      throw new Error("Already registered for the contest.");
    }

    await db.insert(registration).values({
      contestId: data.contestId,
      userId,
      status: "REGISTERED",
    });
  } catch (err) {
    console.log(err);
    throw new Error("Internal Server Error");
  }
};
