import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./lib/db";
import { admin, eq } from "@repo/db";

export async function proxy(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.session || !session.user) {
    redirect("/auth/sign-in");
  }

  const userId = session.user.id;

  const checkAdmin = await db
    .select()
    .from(admin)
    .where(eq(admin.userId, userId));

  if (!checkAdmin) {
    redirect("/auth/sign-in");
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path",
};
