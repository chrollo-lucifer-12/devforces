import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { challenge, eq } from "@repo/db";
import { Challenge } from "../../../lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");

  let query;
  if (id === "all" || !id) {
    query = db.select().from(challenge);
  } else {
    query = db.select().from(challenge).where(eq(challenge.id, id));
  }

  const result = await query;

  return NextResponse.json(result);
}
