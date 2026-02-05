import z from "zod";

export type Contest = {
  contest: {
    id: string;
    name: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
    status: "UPCOMING" | "LIVE" | "DRAFT";
    gitUrl: string;
    startDate: string;
    endDate: string;
  };
  creator: {
    name: string;
    image: string | null;
  };
};

export type UpcomingContest = {
  id: string;
  name: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  status: "LIVE" | "UPCOMING" | "DRAFT";
  gitUrl: string;
  startDate: string | null;
  endDate: string | null;
};

export type Challenge = {
  id: string;
  name: string;
  contestId: string;
  statementLink: string;
  createdAt: string;
  updatedAt: string;
  isHidden: boolean | null;
};

export type ContestInfo = {
  name: string;
  startDate: string;
  endDate: string;
  submissionsCount: number;
  participantsCount: number;
};

export type CreateContestInput = {
  name: string;
};

export const createContestSchema = z.object({
  name: z.string().min(1, { error: "Contest name cannot be empty" }),
});

export type CheckStatus = "idle" | "loading" | "success" | "error";

export type RepoChecks = {
  exists: CheckStatus;
  isPublic: CheckStatus;
};
