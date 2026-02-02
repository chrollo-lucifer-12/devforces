import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar";
import { AppSidebar } from "../../../components/admin-sidebar/app-sidebar";
import { Separator } from "@repo/ui/components/ui/separator";

import BreadCrumbs from "../../../components/breadcrumbs";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/ui/components/ui/input-group";
import { Kbd } from "@repo/ui/components/ui/kbd";
import SearchContests from "../../../components/admin-sidebar/search-contests";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="h-screen w-full flex">
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 justify-between items-center p-4">
            <div className="flex items-center gap-1 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <BreadCrumbs />
            </div>
            <SearchContests />
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
