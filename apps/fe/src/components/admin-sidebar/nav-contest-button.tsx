import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/ui/components/ui/hover-card";
import { Contest } from "../../lib/types";
import {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/components/ui/sidebar";
import { Badge } from "@repo/ui/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUpRightIcon,
  BadgeCheck,
  Clock,
  PlayCircle,
  PlayIcon,
  XCircle,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";

export const contestStatusMap = {
  UPCOMING: {
    label: "Upcoming",
    className:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    Icon: Clock,
  },
  LIVE: {
    label: "Live",
    className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    Icon: PlayIcon,
  },
  DRAFT: {
    label: "Draft",
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    Icon: XCircle,
  },
} as const;

const NavContestButton = ({ contest }: { contest: Contest }) => {
  const router = useRouter();
  const { Icon, className, label } =
    contestStatusMap[contest.contest.status as keyof typeof contestStatusMap];

  const searchParams = useSearchParams();
  const isActive = searchParams.get("contest") === contest.contest.id;
  return (
    <HoverCard openDelay={10} closeDelay={100}>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <HoverCardTrigger asChild>
            <SidebarMenuSubButton
              isActive={isActive}
              asChild
              onClick={() => {
                router.push(`?contest=${contest.contest.id}`);
              }}
              className="cursor-pointer"
            >
              <div className="truncate">{contest.contest.name}</div>
            </SidebarMenuSubButton>
          </HoverCardTrigger>
          <HoverCardContent className="flex w-64 flex-col gap-1" side="right">
            <div className="font-semibold flex items-center gap-2">
              <Avatar size="sm">
                <AvatarImage src={contest.creator.image!} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {contest.contest.name}
            </div>
            <div className="flex flex-row mt-1 text-sm gap-1">
              <Badge className={className}>
                <Icon data-icon="inline-start" />
                {label}
              </Badge>
              <Badge asChild>
                <a href={contest.contest.gitUrl}>
                  Open on Github <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Badge>
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              Created{" "}
              {new Date(contest.contest.createdAt).toLocaleDateString("en-US", {
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

export default NavContestButton;
