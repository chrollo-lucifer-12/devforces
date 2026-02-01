import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { challenge, eq } from "@repo/db";
import { Challenge } from "../../../lib/types";

export const challenges: Challenge[] = [
  {
    id: "ch-001",
    name: "Two Sum",
    contestId: "contest-101",
    statementLink: "https://example.com/challenges/two-sum",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-002",
    name: "Reverse Linked List",
    contestId: "contest-101",
    statementLink: "https://example.com/challenges/reverse-linked-list",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-003",
    name: "Binary Search",
    contestId: "contest-101",
    statementLink: "https://example.com/challenges/binary-search",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-004",
    name: "Valid Parentheses",
    contestId: "contest-102",
    statementLink: "https://example.com/challenges/valid-parentheses",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-005",
    name: "Merge Intervals",
    contestId: "contest-102",
    statementLink: "https://example.com/challenges/merge-intervals",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-006",
    name: "Longest Substring Without Repeating Characters",
    contestId: "contest-102",
    statementLink:
      "https://example.com/challenges/longest-substring-without-repeating",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-007",
    name: "Detect Cycle in Graph",
    contestId: "contest-103",
    statementLink: "https://example.com/challenges/detect-cycle-graph",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-008",
    name: "Top K Frequent Elements",
    contestId: "contest-103",
    statementLink: "https://example.com/challenges/top-k-frequent-elements",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-009",
    name: "Knapsack Problem",
    contestId: "contest-103",
    statementLink: "https://example.com/challenges/knapsack-problem",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
  {
    id: "ch-010",
    name: "Shortest Path in Grid",
    contestId: "contest-104",
    statementLink: "https://example.com/challenges/shortest-path-grid",
    createdAt: "2024-10-05T05:30:00Z",
    updatedAt: "2024-10-05T05:30:00Z",
  },
];

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

  return NextResponse.json(challenges);
}
