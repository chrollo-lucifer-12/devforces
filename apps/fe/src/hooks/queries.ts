import useSWR from "swr";
import { Challenge, Contest } from "../lib/types";

export function useContest(id: string) {
  return useSWR<Contest[]>(`/api/contest?id=${id}`);
}

export function useChallenge(id: string) {
  return useSWR<Challenge[]>(`/api/challenge?id=${id}`);
}
