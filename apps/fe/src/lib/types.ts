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

export type Challenge = {
  id: string;
  name: string;
  contestId: string;
  statementLink: string;
  createdAt: string;
  updatedAt: string;
};

export type ContestInfo = {
  name: string;
  startDate: string;
  endDate: string;
  submissionsCount: number;
  participantsCount: number;
};
