"use client";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { TabsContent } from "@repo/ui/components/ui/tabs";
import { CodeXmlIcon } from "lucide-react";
import { useChallenge } from "../../hooks/queries";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@repo/ui/components/ui/item";
import Link from "next/link";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const AddChallenge = ({ contestId }: { contestId: string }) => {
  const challengQuery = useChallenge(contestId);

  return (
    <TabsContent value="challenges" className="flex-1 mt-4 h-full">
      <Card className="h-full overflow-hidden flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">How to add challenges?</Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-[520px]" side="right">
              <PopoverHeader>
                <PopoverTitle>Guide to add challenges</PopoverTitle>

                <PopoverDescription>
                  <ol className="list-decimal ml-5 space-y-3">
                    <li>Clone the contest repository to your local machine.</li>

                    <li>
                      Create a <code>.env</code> file in the root directory and
                      add:
                      <div className="bg-muted p-2 rounded-md mt-2 text-sm font-mono">
                        GIT_URL=&lt;your-repository-url&gt;
                        <br />
                        <div className="bg-muted p-2 rounded-md mt-2 text-sm font-mono">
                          {`WEBHOOK_URL=${process.env.NEXT_PUBLIC_BASE_URL}/api/contest/update/challenges/${contestId}`}
                        </div>
                      </div>
                    </li>

                    <li>
                      Create a new folder named after your challenge inside the
                      repository.
                    </li>

                    <li>
                      Add a <code>statement.md</code> file inside the challenge
                      folder containing the problem statement.
                    </li>

                    <li>
                      Create a <code>tests</code> folder inside the challenge
                      folder and add test files like:
                      <div className="bg-muted p-2 rounded-md mt-2 text-sm font-mono">
                        test-1.ts
                        <br />
                        test-2.ts
                      </div>
                    </li>
                  </ol>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto flex flex-col gap-4 max-h-[350px]">
          {challengQuery.isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Item key={i} variant="outline">
                <ItemContent className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                </ItemContent>

                <ItemActions>
                  <Skeleton className="h-8 w-28" />
                </ItemActions>
              </Item>
            ))}

          {!challengQuery.isLoading && challengQuery.data?.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CodeXmlIcon />
                </EmptyMedia>
                <EmptyTitle>No Challanges Yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t created any challenges yet.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          {challengQuery.data?.map((challenge) => {
            return (
              <Item
                variant="outline"
                className="transition-colors hover:bg-muted/60 cursor-pointer"
              >
                <ItemContent>
                  <ItemTitle>{challenge.name}</ItemTitle>

                  <ItemDescription>
                    Created At :{" "}
                    {new Date(challenge.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </ItemDescription>
                </ItemContent>

                <ItemActions>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={challenge.statementLink} target="_blank">
                      View On Github
                    </Link>
                  </Button>
                </ItemActions>
              </Item>
            );
          })}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddChallenge;
