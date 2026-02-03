import { CardContent } from "@repo/ui/components/ui/card";
import { Contest } from "../../lib/types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@repo/ui/components/ui/item";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Badge } from "@repo/ui/components/ui/badge";
import { Avatar, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpRightIcon, ChevronRight, FolderCodeIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/ui/components/ui/empty";
import CreateContest from "../create-contest/create-contest-button";

const ContestContent = ({
  isLoading,
  data,
  onItemSelect,
  emptyMessage,
}: {
  isLoading: boolean;
  data: Contest[] | undefined;
  onItemSelect?: (s: string) => void;
  emptyMessage: string;
}) => {
  const isEmpty = data?.length === 0 && !isLoading;

  return (
    <CardContent className="flex flex-col gap-2 max-h-60 overflow-y-auto">
      {isLoading &&
        Array.from({ length: 5 }).map((_, i) => (
          <Item
            key={i}
            variant="outline"
            className="cursor-default animate-pulse"
          >
            <ItemContent className="flex flex-row items-center gap-6 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>

              <Skeleton className="h-6 w-32 rounded-full" />

              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </ItemContent>

            <ItemActions>
              <Skeleton className="h-8 w-8 rounded-full" />
            </ItemActions>
          </Item>
        ))}

      {!isLoading &&
        data?.map((contest) => {
          return (
            <Item
              variant="outline"
              className="cursor-pointer  transition duration-120"
              onClick={() => onItemSelect?.(contest.contest.id)}
              key={contest.contest.id}
            >
              <ItemContent className="flex flex-row items-center gap-6">
                <div>
                  <ItemTitle>{contest.contest.name}</ItemTitle>
                  <ItemDescription>
                    Started at {contest.contest.startDate}
                  </ItemDescription>
                </div>
                <Badge asChild>
                  <a href={contest.contest.gitUrl}>
                    Open on Github <ArrowUpRightIcon data-icon="inline-end" />
                  </a>
                </Badge>
                <Badge asChild>
                  <a href={contest.contest.gitUrl}>
                    {contest.creator.name}{" "}
                    <Avatar size="sm">
                      <AvatarImage src={"https://github.com/shadcn.png"} />
                    </Avatar>
                  </a>
                </Badge>
              </ItemContent>
              <ItemActions>
                <Button
                  size="icon-sm"
                  variant="outline"
                  className="rounded-full"
                  aria-label="Invite"
                >
                  <ChevronRight />
                </Button>
              </ItemActions>
            </Item>
          );
        })}

      {isEmpty && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderCodeIcon />
            </EmptyMedia>
            <EmptyTitle>{emptyMessage}</EmptyTitle>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateContest>
              <Button>Create Contest</Button>
            </CreateContest>
          </EmptyContent>
        </Empty>
      )}
    </CardContent>
  );
};

export default ContestContent;
