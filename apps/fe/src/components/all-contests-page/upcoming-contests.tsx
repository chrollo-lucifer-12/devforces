"use client";

import { Card, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

import { useContest } from "../../hooks/queries";

import ContestContent from "./contest-content";

const UpcomingContests = () => {
  const contestQuery = useContest("all", "UPCOMING");

  return (
    <div className="flex flex-row gap-4 p-4">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Contests</CardTitle>
        </CardHeader>
        <ContestContent
          data={contestQuery.data}
          isLoading={contestQuery.isLoading}
          emptyMessage="No Upcoming contests yet"
        />
      </Card>
    </div>
  );
};

export default UpcomingContests;
