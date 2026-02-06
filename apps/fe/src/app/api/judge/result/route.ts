import { submission } from "@repo/db";
import { db } from "../../../../lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const { submissionId, results } = body;

  await db.update(submission).set({
    status: results,
  });

  return Response.json({ ok: true });
}
