"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { useParams, useSearchParams } from "next/navigation";

const BreadCrumbs = () => {
  const params = useParams();

  const contest = params.contestId;

  const homeLabel = "Dashboard";
  const contestLabel = contest && contest !== "all" ? contest : "All Contests";

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
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
