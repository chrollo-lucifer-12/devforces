import useSWR from "swr";
import { Challenge, Contest, ContestInfo } from "../lib/types";

export function useContest(
  id: string = "",
  status: string = "",
  name: string = "",
) {
  return useSWR<Contest[]>(
    `/api/contest?id=${id}&status=${status}&name=${name}`,
  );
}

export function useChallenge(id: string) {
  return useSWR<Challenge[]>(`/api/challenge?id=${id}`);
}

export function useContestInfo(id: string | null = null) {
  return useSWR<ContestInfo>(id ? `/api/contest/info/${id}` : null);
}

export function useTimer(id: string) {
  return useSWR<{ timeLeft: number }>(`/api/timer/${id}`, {
    refreshInterval: 5000,
  });
}
