"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Album,
  BarChart,
  Cog,
  Compass,
  Home,
  ListMusic,
  Search,
  User2,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const mobileNavItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Search", icon: Search, href: "/" },
  { label: "Browse", icon: Compass, href: "/" },
  { label: "Settings", icon: Cog, href: "/" },
];

const exploreItems = [
  { label: "Top Playlists", icon: ListMusic, href: "/playlist" },
  { label: "Top Charts", icon: BarChart, href: "/chart" },
  { label: "Top Albums", icon: Album, href: "/album" },
  { label: "Top Artists", icon: User2, href: "/artist" },
];

function NavItem({
  label,
  href,
  icon: Icon,
  isActive,
  onClick,
}: {
  label: string;
  href?: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick?: () => void;
}) {
  const commonClasses = cn(
    "group flex h-full w-1/4 flex-col items-center justify-center transition-all duration-300",
    isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
  );

  const iconClasses = cn("h-5 w-5 transition-all", isActive && "scale-110");
  const labelClasses = cn(
    "mt-1 text-xs font-medium transition-all",
    isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={commonClasses}>
        <Icon className={iconClasses} />
        <span className={labelClasses}>{label}</span>
      </button>
    );
  }

  return (
    <Link href={href!} className={commonClasses}>
      <Icon className={iconClasses} />
      <span className={labelClasses}>{label}</span>
    </Link>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="z-100">
          <DrawerHeader>
            <DrawerTitle>Explore</DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-2 gap-4 p-4">
            {exploreItems.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsDrawerOpen(false)}
                className="hover:bg-accent flex flex-col items-center gap-2 rounded-lg border p-4">
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </DrawerContent>
      </Drawer>

      <nav className="border-border/30 bg-background/80 fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between border-t backdrop-blur-md md:hidden">
        {mobileNavItems.map(({ label, icon, href }) => {
          const isActive = pathname === href;

          return (
            <NavItem
              key={label}
              label={label}
              href={label === "Browse" ? undefined : href}
              icon={icon}
              isActive={isActive}
              onClick={
                label === "Browse" ? () => setIsDrawerOpen(true) : undefined
              }
            />
          );
        })}
      </nav>
    </>
  );
}
