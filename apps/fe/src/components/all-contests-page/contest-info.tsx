import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@repo/ui/components/ui/item";
import { useContestInfo } from "../../hooks/queries";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const ContestInfo = ({
  selectedContestId,
}: {
  selectedContestId: string | null;
}) => {
  const contestInfoQuery = useContestInfo(selectedContestId);

  const isLoading = contestInfoQuery.isLoading;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">
          {isLoading ? (
            <Skeleton className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
          ) : (
            contestInfoQuery.data?.name
          )}
          <CardDescription>
            {isLoading ? (
              <Skeleton className="h-4 w-48 bg-gray-200 rounded mt-1 animate-pulse" />
            ) : (
              `Started at ${contestInfoQuery.data?.startDate}`
            )}
          </CardDescription>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Item variant="outline" size="sm" asChild>
          <ItemContent>
            <ItemTitle>
              {isLoading ? (
                <Skeleton className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              ) : (
                `${contestInfoQuery.data?.participantsCount} Participants are competing`
              )}
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="outline" size="sm" asChild>
          <ItemContent>
            <ItemTitle>
              {isLoading ? (
                <Skeleton className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              ) : (
                `${contestInfoQuery.data?.submissionsCount} Submissions made`
              )}
            </ItemTitle>
          </ItemContent>
        </Item>
      </CardContent>
    </Card>
  );
};

export default ContestInfo;
