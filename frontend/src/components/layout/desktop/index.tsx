import Link from "next/link";
import React from "react";
import { YolidayLogo } from "../logo";
import {
  Bell,
  Briefcase,
  FormInput,
  LayoutDashboard,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sidebarNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Portfolio", href: "/portfolio", icon: Briefcase },
  { title: "Inputs", href: "/inputs", icon: FormInput },
  { title: "Profile", href: "/profile", icon: User },
];

type Props = {
  children: React.ReactNode;
};

export const DesktopLayout = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="hidden md:block h-full bg-orange-500 text-white fixed inset-y-0 left-0 z-10 w-64">
        <div className="flex h-full max-h-screen flex-col gap-11">
          <div className="flex h-14 items-center lg:h-[60px] lg:px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <YolidayLogo />
              <span>Yoliday</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium">
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    router.pathname === item.href &&
                      "bg-gradient-to-r from-white to-transparent text-primary",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col pl-64 h-dvh">
        <header className="sticky top-0 z-30 flex items-center justify-end bg-background px-4 h-1/14">
          <div className="flex items-end gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>LP</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 bg-muted h-13/14">
          <div className="bg-white m-7 p-5 rounded-xl">{props.children}</div>
        </main>
      </div>
    </div>
  );
};
