import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar";
import { AppSidebar } from "../../../components/admin-sidebar/app-sidebar";
import { Separator } from "@repo/ui/components/ui/separator";

import BreadCrumbs from "../../../components/breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="h-screen w-full flex">
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <BreadCrumbs />
            </div>
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
