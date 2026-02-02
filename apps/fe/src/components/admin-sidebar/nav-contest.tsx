import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";

import { useContest } from "../../hooks/queries";
import NavContestButton from "./nav-contest-button";
import NavRenderer from "./nav-renderer";

const NavContest = () => {
  const contestQuery = useContest("all");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <p className="font-medium">Contests</p>
      </SidebarMenuButton>
      <NavRenderer
        error={contestQuery.error}
        emptyMessage="No Contests Available"
        isEmpty={false}
        isLoading={contestQuery.isLoading}
        Content={contestQuery.data?.map((contest) => (
          <NavContestButton key={contest.contest.id} contest={contest} />
        ))}
      />
    </SidebarMenuItem>
  );
};

export default NavContest;
