import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { challenge, eq } from "@repo/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");

  const result = await db
    .select()
    .from(challenge)
    .where(eq(challenge.contestId, id!));

  return NextResponse.json(result);
}
