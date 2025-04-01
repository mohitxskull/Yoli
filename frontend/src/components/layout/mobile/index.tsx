import Link from "next/link";
import React from "react";
import { YolidayLogo } from "../logo";
import {
  Bell,
  Briefcase,
  FormInput,
  LayoutDashboard,
  Menu,
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Portfolio", href: "/portfolio", icon: Briefcase },
  { title: "Inputs", href: "/inputs", icon: FormInput },
  { title: "Profile", href: "/profile", icon: User },
];

type Props = {
  children: React.ReactNode;
};

export const MobileLayout = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 md:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b bg-background px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs p-0 bg-orange-500">
              <div className="h-full text-white fixed inset-y-0 left-0 z-10">
                <div className="flex h-full max-h-screen flex-col gap-11">
                  <div className="flex h-14 items-center lg:h-[60px] lg:px-4">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-semibold"
                    >
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
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4">
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
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          {props.children}
        </main>
      </div>
    </div>
  );
};
