export type Contest = {
  contest: {
    id: string;
    name: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
    status: string | null;
    gitUrl: string;
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
