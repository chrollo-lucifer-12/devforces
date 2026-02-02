"use client";

import { Card, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

import { useContest } from "../../hooks/queries";
import { useState } from "react";

import ContestContent from "./contest-content";
import ContestInfo from "./contest-info";

const LiveContests = () => {
  const contestQuery = useContest("all", "LIVE", "");
  const [selectedContest, setSelectedContest] = useState<string>();

  return (
    <div className="flex flex-row gap-4 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-lg">Live Contests</CardTitle>
        </CardHeader>
        <ContestContent
          isLoading={contestQuery.isLoading}
          data={contestQuery.data}
          onItemSelect={(id: string) => {
            setSelectedContest(id);
          }}
          emptyMessage="No Live Contests Yet"
        />
      </Card>
      <ContestInfo
        selectedContestId={selectedContest ? selectedContest : null}
      />
    </div>
  );
};

export default LiveContests;
