import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
} from "@repo/ui/components/ui/sidebar";

import { useContest } from "../../hooks/queries";
import NavContestButton from "./nav-contest-button";

const NavContest = () => {
  const contestQuery = useContest("all");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <p className="font-medium">Contests</p>
      </SidebarMenuButton>
      {contestQuery.isLoading && (
        <SidebarMenuSub>
          {Array.from({ length: 10 }).map((_, i) => {
            return <SidebarMenuSkeleton key={i}></SidebarMenuSkeleton>;
          })}
        </SidebarMenuSub>
      )}
      {!contestQuery.isLoading &&
        contestQuery.data?.map((contest) => {
          return (
            <NavContestButton key={contest.contest.id} contest={contest} />
          );
        })}
    </SidebarMenuItem>
  );
};

export default NavContest;
