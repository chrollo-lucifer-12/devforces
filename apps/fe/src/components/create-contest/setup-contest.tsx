// @ts-nocheck
"use client";
import { GitHubIcon } from "@repo/ui/better-auth-ui";
import { CodeXmlIcon, SwordsIcon, CalculatorIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import VerifyRepo from "./verify-repo";
import { useContest } from "../../hooks/queries";
import SetupContestSkeleton from "./setup-contest-skeleton";
import AddChallenge from "./add-challenge";
import { useEffect, useState } from "react";
import PublishChallenge from "./publish-challenge";

const titles = {
  "github-repo": "Start by setting up a repository",
  challenges: "Add challenges",
  scoring: "Configure scoring",
};

const SetupContest = ({ contestId }: { contestId: string }) => {
  const contestQuery = useContest(contestId, "", "");
  const [currentTab, setCurrentTab] = useState("");
  const isDisabled =
    contestQuery.isLoading || !contestQuery.data?.[0]?.contest.gitUrl;
  const defaultTab = isDisabled ? "github-repo" : "challenges";

  useEffect(() => {
    setCurrentTab(defaultTab);
  }, [defaultTab]);

  if (contestQuery.isLoading || contestQuery.error)
    return <SetupContestSkeleton />;

  return (
    <Card className="w-full max-w-5xl h-[75vh] bg-black/20">
      <CardHeader>
        <CardTitle className="text-2xl">{titles[currentTab]}</CardTitle>
      </CardHeader>

      <CardContent className="h-full flex flex-col">
        <Tabs
          value={currentTab}
          className="w-full h-full flex flex-col"
          onValueChange={setCurrentTab}
        >
          <TabsList className="w-full flex justify-start">
            <TabsTrigger value="github-repo" disabled={!isDisabled}>
              <GitHubIcon /> Github Repo
            </TabsTrigger>
            <TabsTrigger value="challenges" disabled={isDisabled}>
              <SwordsIcon /> Challenges
            </TabsTrigger>
            <TabsTrigger value="publish" disabled={isDisabled}>
              <CalculatorIcon /> Publish
            </TabsTrigger>
          </TabsList>

          <VerifyRepo id={contestId} />
          <AddChallenge contestId={contestId} />
          <PublishChallenge
            contestId={contestId}
            status={contestQuery.data?.[0]?.contest.status!}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SetupContest;
