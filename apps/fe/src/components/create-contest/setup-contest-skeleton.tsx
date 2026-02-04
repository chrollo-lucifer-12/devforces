"use client";

import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const SetupContestSkeleton = () => {
  return (
    <Card className="w-full max-w-5xl h-[75vh] bg-black/20">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>

      <CardContent className="h-full flex flex-col space-y-6">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>

        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-1/2" />

          <div className="pt-6 space-y-3">
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupContestSkeleton;
