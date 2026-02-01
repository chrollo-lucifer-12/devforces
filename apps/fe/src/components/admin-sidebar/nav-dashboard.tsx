import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/components/ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";

const NavDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isContestActive = searchParams.get("contest") === "all";
  const isChallengeActive = searchParams.get("challenge") === "all";
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <p className="font-medium">Dashboard</p>
      </SidebarMenuButton>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton
            isActive={isContestActive}
            asChild
            onClick={() => {
              router.push("?contest=all");
            }}
            className="cursor-pointer"
          >
            <p>All Contests</p>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton
            isActive={isChallengeActive}
            asChild
            onClick={() => {
              router.push("?challenge=all");
            }}
            className="cursor-pointer"
          >
            <p>All Challenges</p>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
};

export default NavDashboard;
