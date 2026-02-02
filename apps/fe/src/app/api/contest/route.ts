import { NextRequest, NextResponse } from "next/server";

import { db } from "../../../lib/db";
import { and, contest, eq, user, contestStatusEnum, ilike } from "@repo/db";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const status = searchParams.get("status");

  const whereConditions = [];

  if (id && id !== "all") {
    whereConditions.push(eq(contest.id, id));
  }
  if (status) {
    whereConditions.push(
      eq(
        contest.status,
        status as (typeof contestStatusEnum.enumValues)[number],
      ),
    );
  }
  if (name) {
    whereConditions.push(ilike(contest.name, name));
  }

  const query = db
    .select({
      contest,
      creator: {
        name: user.name,
        image: user.image,
      },
    })
    .from(contest)
    .innerJoin(user, eq(contest.creatorId, user.id));

  if (whereConditions.length > 0) {
    query.where(and(...whereConditions));
  }

  const result = await query;

  return NextResponse.json(result);
}
