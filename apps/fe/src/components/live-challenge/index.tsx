import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
const LiveChallenge = ({
  contestName,
  problems,
  contestId,
}: {
  contestName: string;
  contestId: string;
  problems: { id: string; name: string; solved: boolean }[];
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-orange-400">
          {contestName}
        </h2>
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-lg text-neutral-200">
              Problem List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                href={`/contest/${contestId}/${problem.id}`}
                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-neutral-800 transition"
              >
                <div className="flex items-center gap-2">
                  {problem.solved && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm text-neutral-200">
                    {problem.name}
                  </span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveChallenge;
