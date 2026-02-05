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
import { CodeXmlIcon, EyeOffIcon, Trash2Icon } from "lucide-react";
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
import { useHiddenChallenge } from "../../hooks/mutations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { toast } from "sonner";

const AddChallenge = ({ contestId }: { contestId: string }) => {
  const challengQuery = useChallenge(contestId);
  const { trigger, isMutating } = useHiddenChallenge();

  const handleHideChallenge = async (id: string) => {
    toast.info("Marking the challenge as hidden");
    await trigger({ id });
  };

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
                key={challenge.id}
                variant="outline"
                className={`transition-colors cursor-pointer ${challenge.isHidden ? "border border-yellow-300 " : "border border-green-300 "}`}
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        disabled={challenge.isHidden === true || isMutating}
                      >
                        {" "}
                        {challenge.isHidden
                          ? "Hidden Challenge"
                          : " Hide Challenge?"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                          <EyeOffIcon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Hide challenge</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently hide this challege.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel variant="outline">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          disabled={isMutating}
                          onClick={() => {
                            handleHideChallenge(challenge.id);
                          }}
                        >
                          Hide
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
