import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";

import { useChallenge } from "../../hooks/queries";
import NavChallengeButton from "./nav-challenge-button";
import NavRenderer from "./nav-renderer";

const NavChallenge = () => {
  const challengeQuery = useChallenge("all");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <p className="font-medium">Challenges</p>
      </SidebarMenuButton>
      <NavRenderer
        emptyMessage="No Challenges Available"
        error={challengeQuery.error}
        isLoading={challengeQuery.isLoading}
        isEmpty={challengeQuery.data?.length === 0}
        Content={challengeQuery.data?.map((challenge) => {
          return (
            <NavChallengeButton challenge={challenge} key={challenge.id} />
          );
        })}
      />
    </SidebarMenuItem>
  );
};

export default NavChallenge;
