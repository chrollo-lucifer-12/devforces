"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { useSearchParams } from "next/navigation";

const BreadCrumbs = () => {
  const searchParams = useSearchParams();

  const contest = searchParams.get("contest");
  const challenge = searchParams.get("challenge");

  const homeLabel = "Dashboard";
  const contestLabel = contest && contest !== "all" ? contest : "All Contests";
  const challengeLabel =
    challenge && challenge !== "all" ? challenge : "All Challenges";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">{homeLabel}</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="hidden md:block" />

        {contest && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage>{contestLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {challenge && (
          <BreadcrumbItem>
            <BreadcrumbPage>{challengeLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
