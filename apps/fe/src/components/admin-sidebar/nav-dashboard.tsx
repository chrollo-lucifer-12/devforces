import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/ui/components/ui/sidebar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const NavDashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isContestActive = searchParams.get("contest") === "all";

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
            className="cursor-pointer"
          >
            <Link href={`/admin/all`}>All Contests</Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
};

export default NavDashboard;
