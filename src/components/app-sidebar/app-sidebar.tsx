"use client";

import Link from "next/link";

import {
  Flame,
  ListMusic,
  Star,
  Send,
  Settings,
  BarChart2,
  Search,
  Music4Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavMain } from "./sidebar-main";
import { NavSecondary } from "./sidebar-secondary";
import { NavUser } from "./sidebar-user";

const data = {
  navMain: [
    {
      name: "Fresh Drops",
      url: "/album",
      icon: Flame,
    },
    {
      name: "Search",
      url: "/search",
      icon: Search,
    },
    {
      name: "Top Playlists",
      url: "/playlist",
      icon: ListMusic,
    },
    {
      name: "Top Charts",
      url: "/chart",
      icon: BarChart2,
    },
    {
      name: "Top Artists",
      url: "/artist",
      icon: Star,
    },
  ],
  navSecondary: [
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <Music4Icon className="!size-5" />
                <span className="text-base font-semibold">SwarX</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
