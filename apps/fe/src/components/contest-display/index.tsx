"use client";

import { UpcomingContest } from "../../lib/types";
import ContestSection from "./contest-card";

const ContestDisplay = ({
  upcomingContests,
}: {
  upcomingContests: UpcomingContest[];
}) => {
  return (
    <div>
      <ContestSection upcomingContests={upcomingContests} />
    </div>
  );
};

export default ContestDisplay;
