import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/ui/components/ui/hover-card";
import { Challenge } from "../../lib/types";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/components/ui/sidebar";
import { Badge } from "@repo/ui/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRightIcon } from "lucide-react";

const NavChallengeButton = ({ challenge }: { challenge: Challenge }) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const isActive = searchParams.get("challenge") === challenge.id;
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <HoverCardTrigger asChild>
            <SidebarMenuSubButton
              isActive={isActive}
              asChild
              onClick={() => {
                router.push(`?challenge=${challenge.id}`);
              }}
              className="cursor-pointer"
            >
              <div className="truncate">{challenge.name}</div>
            </SidebarMenuSubButton>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-64 flex-col gap-1" side="right">
            <div className="font-semibold flex items-center gap-2">
              {challenge.name}
            </div>
            <div className="flex flex-row mt-1 text-sm gap-1">
              <Badge asChild>
                <a href={challenge.statementLink}>
                  Open on Github <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Badge>
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              Created{" "}
              {new Date(challenge.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </HoverCardContent>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </HoverCard>
  );
};

export default NavChallengeButton;
