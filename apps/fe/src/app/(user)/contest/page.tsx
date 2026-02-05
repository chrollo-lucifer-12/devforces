import { asc, contest, gt } from "@repo/db";
import ContestDisplay from "../../../components/contest-display";
import { db } from "../../../lib/db";

const ContestPage = async () => {
  const upcomingContests = await db
    .select()
    .from(contest)
    .where(gt(contest.startDate, new Date().toISOString()))
    .orderBy(asc(contest.startDate))
    .limit(2);

  return <ContestDisplay upcomingContests={upcomingContests} />;
};

export default ContestPage;
