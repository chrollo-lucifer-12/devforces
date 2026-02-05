import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import {
  createContest,
  markHiddenContest,
  publishContest,
  updateContest,
} from "../actions/contest";
import { mutate } from "swr";
import { CreateContestInput } from "../lib/types";
import { useRouter } from "next/navigation";

const createContestFetcher = async (
  _key: string,
  { arg }: { arg: CreateContestInput },
) => {
  return createContest(arg);
};

const updateContestFetcher = async (
  _key: string,
  { arg }: { arg: { gitUrl: string; id: string } },
) => {
  return updateContest(arg);
};

const publishContestFetcher = async (
  _key: string,
  { arg }: { arg: { id: string; from: string; to: string } },
) => {
  return publishContest(arg);
};

const hiddenContestFetcher = async (
  _key: string,
  { arg }: { arg: { id: string } },
) => {
  return markHiddenContest(arg);
};

export const useCreateContest = () => {
  const router = useRouter();
  return useSWRMutation("/api/contest", createContestFetcher, {
    throwOnError: false,
    onError: (error) => {
      toast.error(error?.message ?? "Failed to create contest");
    },
    onSuccess: async (data) => {
      mutate(
        (key) => typeof key === "string" && key.startsWith("/api/contest"),
      );
      router.push(`?contest=${data.id}`);
    },
  });
};

export const useUpdateContest = (
  id: string,
  message: string = "Git repository was verified and updated successfully",
) => {
  return useSWRMutation(`/api/contest?id=${id}`, updateContestFetcher, {
    throwOnError: false,
    onError: (error) => {
      toast.error(error?.message ?? "Failed to update contest");
    },
    onSuccess: async (data) => {
      mutate(`/api/contest?id=${id}`);
      toast.success(message);
    },
  });
};

export const usePublishContest = (id: string) => {
  return useSWRMutation(`/api/contest?id=${id}`, publishContestFetcher, {
    throwOnError: false,
    onError: (error) => {
      toast.error(error?.message ?? "Failed to publish contest");
    },
    onSuccess: async () => {
      mutate((key) => typeof key === "string" && key.includes("/api/contest"));

      toast.success("Contest was published successfully!");
    },
  });
};

export const useHiddenChallenge = () => {
  return useSWRMutation(`/api/challenge`, hiddenContestFetcher, {
    throwOnError: false,
    onError: (error) => {
      toast.error(error?.message ?? "Failed to hide contest");
    },
    onSuccess: async () => {
      mutate(
        (key) => typeof key === "string" && key.includes("/api/challenge"),
      );
      toast.success("Challenge hidden successfully!");
    },
  });
};
