"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatarProfile } from "@/components/custom/user-avatar-profile";
import { SignoutButton } from "@/modules/public/ui/components/signout-button";
import { useSession } from "@/hooks/use-session";

const pageTitles: Record<string, string> = {
  "/overview": "Overview",
  "/absensi": "Absensi",
  "/keuangan": "Keuangan",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const { session } = useSession();

  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-1.5">
              <UserAvatarProfile
                className="size-7"
                name={session?.user?.name ?? "User"}
                email={session?.user?.email ?? ""}
                imageUrl={session?.user?.image ?? ""}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <UserAvatarProfile
                showInfo
                name={session?.user?.name ?? "User"}
                email={session?.user?.email ?? ""}
                imageUrl={session?.user?.image ?? ""}
              />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <SignoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
