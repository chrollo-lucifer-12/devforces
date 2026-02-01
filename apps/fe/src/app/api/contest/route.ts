import { NextRequest, NextResponse } from "next/server";
import { logger } from "../../../lib/logger";
import { db } from "../../../lib/db";
import { contest, eq, user } from "@repo/db";
import { Contest } from "../../../lib/types";
const log = logger.child({ module: "totoro" });

const contests: Contest[] = [
  {
    contest: {
      id: "c1",
      name: "January Code Sprint",
      creatorId: "u1",
      createdAt: "2025-01-01T10:00:00Z",
      updatedAt: "2025-01-02T12:00:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/january-code-sprint",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c2",
      name: "DSA Weekly Challenge",
      creatorId: "u2",
      createdAt: "2025-01-05T09:30:00Z",
      updatedAt: "2025-01-10T14:15:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/dsa-weekly",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c3",
      name: "Frontend Masters Contest",
      creatorId: "u3",
      createdAt: "2024-12-15T08:00:00Z",
      updatedAt: "2025-01-01T18:45:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/frontend-masters-contest",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c4",
      name: "Open Source Hackathon",
      creatorId: "u4",
      createdAt: "2025-01-12T11:20:00Z",
      updatedAt: "2025-01-12T11:20:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/open-source-hackathon",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c5",
      name: "Backend Battle",
      creatorId: "u1",
      createdAt: "2025-01-18T07:45:00Z",
      updatedAt: "2025-01-20T16:10:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/backend-battle",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c6",
      name: "System Design Showdown",
      creatorId: "u5",
      createdAt: "2025-01-22T13:00:00Z",
      updatedAt: "2025-01-22T13:00:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/system-design-showdown",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c7",
      name: "Algo Marathon",
      creatorId: "u2",
      createdAt: "2024-11-10T06:00:00Z",
      updatedAt: "2024-12-01T19:30:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/algo-marathon",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c8",
      name: "React Performance Contest",
      creatorId: "u6",
      createdAt: "2025-01-25T10:10:00Z",
      updatedAt: "2025-01-26T15:40:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/react-performance-contest",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c9",
      name: "AI Prompt Engineering Challenge",
      creatorId: "u7",
      createdAt: "2025-01-28T09:00:00Z",
      updatedAt: "2025-01-28T09:00:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/ai-prompt-challenge",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
  {
    contest: {
      id: "c10",
      name: "Full Stack Finals",
      creatorId: "u3",
      createdAt: "2024-10-05T05:30:00Z",
      updatedAt: "2024-11-01T20:00:00Z",
      status: "UPCOMING",
      gitUrl: "https://github.com/example/full-stack-finals",
    },
    creator: {
      name: "chrollo",
      image: "https://github.com/shadcn.png",
    },
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const id = searchParams.get("id");

  let query;
  if (id === "all" || !id) {
    query = db
      .select({
        contest,
        creator: {
          name: user.name,
          image: user.image,
        },
      })
      .from(contest)
      .innerJoin(user, eq(contest.creatorId, user.id));
  } else {
    query = db
      .select({
        contest,
        creator: {
          name: user.name,
          image: user.image,
        },
      })
      .from(contest)
      .innerJoin(user, eq(contest.creatorId, user.id))
      .where(eq(contest.id, id));
  }

  const result = await query;

  return NextResponse.json(contests);
}
