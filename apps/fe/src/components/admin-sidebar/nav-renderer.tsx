import {
  SidebarMenuSkeleton,
  SidebarMenuSub,
} from "@repo/ui/components/ui/sidebar";

type NavRendererProps = {
  isLoading: boolean;
  error: any;
  isEmpty: boolean;
  Content: React.ReactNode;
  emptyMessage: string;
};

const NavRenderer = ({
  isLoading,
  error,
  isEmpty,
  Content,
  emptyMessage,
}: NavRendererProps) => {
  if (isLoading) {
    return (
      <SidebarMenuSub>
        {Array.from({ length: 10 }).map((_, i) => (
          <SidebarMenuSkeleton key={i} />
        ))}
      </SidebarMenuSub>
    );
  }

  if (error || isEmpty) {
    return (
      <SidebarMenuSub className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 rounded-lg border border-red-700">
        <p className="text-xs">{emptyMessage}</p>
      </SidebarMenuSub>
    );
  }

  return Content;
};

export default NavRenderer;
