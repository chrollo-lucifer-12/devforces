"use client";

import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Trophy, Hourglass, BellRing, Loader2 } from "lucide-react";
import { UpcomingContest } from "../../lib/types";
import { useCountdown } from "../../hooks/use-countdown";
import { useRegisterContest } from "../../hooks/mutations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

function ContestCard({
  title,
  subtitle,
  startDate,
  gradient,
  contestId,
}: {
  title: string;
  subtitle: string;
  startDate: string;
  gradient: string;
  contestId: string;
}) {
  const timer = useCountdown(contestId);
  const { trigger, isMutating } = useRegisterContest();
  const router = useRouter();

  return (
    <Card
      className={`relative overflow-hidden border-none text-white ${gradient} rounded-3xl cursor-pointer`}
      onClick={() => {
        router.push(`/contest/${contestId}`);
      }}
    >
      <CardContent className="p-0">
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur">
          <Hourglass size={16} />
          {timer}
        </div>

        <div className="h-[150px] w-full flex items-center justify-center">
          <div className="h-20 w-20 rounded-xl border border-white/40 backdrop-blur bg-white/10" />
        </div>

        <div className="flex items-center justify-between bg-black/20 px-6 py-4 backdrop-blur">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-white/70">
              {new Date(subtitle).toLocaleString()}
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition">
                {isMutating ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <BellRing size={18} />
                )}
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Do you want to register for the contest?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isMutating}>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  disabled={isMutating}
                  onClick={async () => {
                    await trigger({ contestId });
                  }}
                >
                  {isMutating ? "Registering..." : "Register"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ContestSection({
  upcomingContests,
}: {
  upcomingContests: UpcomingContest[];
}) {
  const gradients = [
    "bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-600",
    "bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600",
  ];

  const isSingle = upcomingContests.length === 1;

  return (
    <section className="relative py-20">
      <div className="mb-14 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-yellow-500/10 p-4">
            <Trophy className="h-10 w-10 text-yellow-400" />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-white">Devforces Contest</h2>
        <p className="mt-2 text-white/60">
          Contest every week. Compete and see your ranking!
        </p>
      </div>

      <div
        className={`mx-auto grid max-w-5xl gap-6 px-4 ${
          isSingle ? "md:grid-cols-1 place-items-center" : "md:grid-cols-2"
        }`}
      >
        {upcomingContests.map((c, i) => (
          <div key={c.id} className={isSingle ? "w-full md:max-w-md" : ""}>
            <ContestCard
              title={c.name}
              subtitle={c.startDate!}
              startDate={c.startDate!}
              gradient={gradients[i]!}
              contestId={c.id}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
