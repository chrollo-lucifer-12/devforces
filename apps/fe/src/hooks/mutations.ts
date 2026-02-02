import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { createContest } from "../actions/contest";
import { mutate } from "swr";
import { CreateContestInput } from "../lib/types";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const createContestFetcher = async (
  _key: string,
  { arg }: { arg: CreateContestInput },
) => {
  return createContest(arg);
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
      toast.success("Contest created succcessfully");
      await toast.promise(
        async () => {
          await router.push(`?contest=${data.id}`);

          return { name: data.name };
        },
        {
          loading: "Redirecting...",
          success: (res) => `Redirected to ${res.name}!`,
          error: "Failed to redirect",
        },
      );
    },
  });
};
