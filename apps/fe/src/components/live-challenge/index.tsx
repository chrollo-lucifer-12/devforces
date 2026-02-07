"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Check, Trophy } from "lucide-react";

import Link from "next/link";
import { useTimer } from "../../hooks/queries";
import { useCountdown } from "../../hooks/use-countdown";

const LiveChallenge = ({
  contestName,
  problems,
  contestId,
  leaderboard,
}: {
  contestName: string;
  contestId: string;
  problems: { id: string; name: string; solved: boolean }[];
  leaderboard: {
    userId: string;
    score: number | null;
    username: string;
    imageUrl: string | null;
    rank: number;
  }[];
}) => {
  const timer = useCountdown(contestId);

  return (
    <div className="min-h-screen w-full px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="flex flex-row items-center gap-10 text-4xl font-bold text-orange-400 tracking-tight">
          <p className="">{contestName}</p> <div>{timer}</div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-lg text-neutral-200">
                Problems
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              {problems.length === 0 && (
                <p className="text-neutral-400 text-sm">
                  No problems available
                </p>
              )}

              {problems.map((problem, index) => (
                <Link
                  key={problem.id}
                  href={`/contest/${contestId}/${problem.id}`}
                  className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-neutral-800 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-500 text-sm w-6">
                      {String.fromCharCode(65 + index)}
                    </span>

                    {problem.solved && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}

                    <span
                      className={`text-sm ${
                        problem.solved ? "text-green-400" : "text-neutral-200"
                      }`}
                    >
                      {problem.name}
                    </span>
                  </div>

                  <span className="text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition">
                    Open →
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-neutral-200">
                Leaderboard
              </CardTitle>
              <Trophy className="w-5 h-5 text-yellow-400" />
            </CardHeader>

            <CardContent className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {leaderboard.length === 0 && (
                <p className="text-neutral-400 text-sm">No submissions yet</p>
              )}

              {leaderboard.map((user, index) => (
                <div
                  key={user.userId}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-800 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-medium w-6
                        ${
                          index === 0
                            ? "text-yellow-400"
                            : index === 1
                              ? "text-gray-300"
                              : index === 2
                                ? "text-amber-600"
                                : "text-neutral-400"
                        }
                      `}
                    >
                      #{user.rank}
                    </span>

                    <div className="text-sm text-neutral-200 flex flex-row gap-2 items-center">
                      <Avatar>
                        <AvatarImage src={user.imageUrl!} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>{user.username}</p>
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-orange-400">
                    {user.score}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveChallenge;
