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

const SetupContest = ({ contestId }: { contestId: string }) => {
  const contestQuery = useContest(contestId, "", "");

  const isDisabled =
    contestQuery.isLoading || !contestQuery.data?.[0]?.contest.gitUrl;

  return (
    <Card className="w-full max-w-5xl h-[75vh] bg-black/20">
      <CardHeader>
        <CardTitle className="text-2xl">Create Contest</CardTitle>
      </CardHeader>

      <CardContent className="h-full flex flex-col">
        <Tabs
          defaultValue={isDisabled ? "github-repo" : "contest-details"}
          className="w-full h-full flex flex-col"
        >
          <TabsList className="w-full flex justify-start">
            <TabsTrigger value="github-repo" disabled={!isDisabled}>
              <GitHubIcon /> Github Repo
            </TabsTrigger>
            <TabsTrigger value="contest-details" disabled={isDisabled}>
              <CodeXmlIcon /> Contest Details
            </TabsTrigger>
            <TabsTrigger value="challenges" disabled={isDisabled}>
              <SwordsIcon /> Challenges
            </TabsTrigger>
            <TabsTrigger value="scoring" disabled={isDisabled}>
              <CalculatorIcon /> Scoring
            </TabsTrigger>
          </TabsList>

          <VerifyRepo id={contestId} />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SetupContest;
