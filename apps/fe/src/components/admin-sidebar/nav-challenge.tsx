import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
} from "@repo/ui/components/ui/sidebar";

import { useChallenge, useContest } from "../../hooks/queries";
import NavContestButton from "./nav-contest-button";
import NavChallengeButton from "./nav-challenge-button";

const NavChallenge = () => {
  const challengeQuery = useChallenge("all");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <p className="font-medium">Challenges</p>
      </SidebarMenuButton>
      {challengeQuery.isLoading && (
        <SidebarMenuSub>
          {Array.from({ length: 10 }).map((_, i) => {
            return <SidebarMenuSkeleton key={i}></SidebarMenuSkeleton>;
          })}
        </SidebarMenuSub>
      )}
      {!challengeQuery.isLoading &&
        challengeQuery.data?.map((challenge) => {
          return (
            <NavChallengeButton challenge={challenge} key={challenge.id} />
          );
        })}
    </SidebarMenuItem>
  );
};

export default NavChallenge;
