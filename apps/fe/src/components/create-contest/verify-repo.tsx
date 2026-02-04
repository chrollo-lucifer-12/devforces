import { GitHubIcon } from "@repo/ui/better-auth-ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@repo/ui/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@repo/ui/components/ui/item";
import { TabsContent } from "@repo/ui/components/ui/tabs";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  Loader2Icon,
  ShieldAlertIcon,
  XCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { CheckStatus, Contest, RepoChecks } from "../../lib/types";
import { checkRepoExists, checkRepoPublic } from "../../lib/fetcher";
import { useUpdateContest } from "../../hooks/mutations";

const statusIcon = (status: CheckStatus) => {
  switch (status) {
    case "loading":
      return (
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      );
    case "success":
      return <CheckCircleIcon className="size-5 text-green-600" />;
    case "error":
      return <XCircleIcon className="size-5 text-red-600" />;
    default:
      return <ShieldAlertIcon className="size-5 text-muted-foreground" />;
  }
};

const statusBg = (status: CheckStatus) => {
  if (status === "success")
    return "bg-green-50 text-green-700 border border-green-700 dark:bg-green-950 dark:text-green-300 dark:border-green-300";
  if (status === "error")
    return "bg-red-50 text-red-700 border border-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-300";
  return "bg-muted";
};

const VerifyRepo = ({ id }: { id: string }) => {
  const { trigger, isMutating } = useUpdateContest(id);
  const [repoUrl, setRepoUrl] = useState("");
  const [checks, setChecks] = useState<RepoChecks>({
    exists: "idle",
    isPublic: "idle",
  });

  const verifyRepo = async (e: any) => {
    e.preventDefault();
    setChecks({
      exists: "loading",
      isPublic: "idle",
    });

    try {
      const data = await checkRepoExists(repoUrl);
      setChecks((c) => ({ ...c, exists: "success", isPublic: "loading" }));

      await checkRepoPublic(data.private === "false");
      setChecks((c) => ({ ...c, isPublic: "success", isEmpty: "loading" }));

      await trigger({ gitUrl: repoUrl, id: id });
      setChecks((c) => ({ ...c, isEmpty: "success" }));
    } catch (err) {
      setChecks((c) => {
        if (c.exists === "loading") return { ...c, exists: "error" };
        if (c.isPublic === "loading") return { ...c, isPublic: "error" };
        return { ...c, isEmpty: "error" };
      });
    }
  };

  return (
    <TabsContent value="github-repo" className="flex-1 mt-4">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardDescription className="text-lg">
            Make a new repository in your org with{" "}
            <a
              href="https://github.com/chrollo-lucifer-12/template-contests"
              className="underline"
            >
              this repo
            </a>{" "}
            as the template repo.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <form onSubmit={verifyRepo}>
            <InputGroup className="[--radius:9999px]">
              <InputGroupAddon>
                <InputGroupButton variant="secondary" size="icon-xs">
                  <GitHubIcon />
                </InputGroupButton>
              </InputGroupAddon>
              <InputGroupAddon className="text-muted-foreground pl-1.5">
                https://
              </InputGroupAddon>
              <InputGroupInput
                id="input-secure-19"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="secondary"
                  type="submit"
                  disabled={
                    Object.values(checks).includes("loading") || isMutating
                  }
                >
                  {Object.values(checks).includes("loading") || isMutating
                    ? "Verifying Repository"
                    : "Verify Repository"}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <div className="mt-6 flex flex-col gap-4">
            <Item
              variant="outline"
              size="sm"
              asChild
              className={statusBg(checks.exists)}
            >
              <a>
                <ItemMedia>{statusIcon(checks.exists)}</ItemMedia>
                <ItemContent>
                  <ItemTitle>Does the repository exists ?</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="size-4" />
                </ItemActions>
              </a>
            </Item>
            <Item
              variant="outline"
              size="sm"
              asChild
              className={statusBg(checks.isPublic)}
            >
              <a>
                <ItemMedia>{statusIcon(checks.isPublic)}</ItemMedia>
                <ItemContent>
                  <ItemTitle>Is the repository public ?</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon className="size-4" />
                </ItemActions>
              </a>
            </Item>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
export default VerifyRepo;
