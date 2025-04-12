"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Cog, Compass, Home, Search } from "lucide-react";

import { cn } from "@/lib/utils";

const mobileNavItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Search", icon: Search, href: "/" },
  { label: "Browse", icon: Compass, href: "/" },
  { label: "Settings", icon: Cog, href: "/" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="border-border/30 bg-background/80 fixed inset-x-0 bottom-0 z-50 flex h-16 items-center justify-between border-t backdrop-blur-md lg:hidden">
      {mobileNavItems.slice().map(({ label, icon: Icon, href }) => {
        const isActive = href === pathname;

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "group flex h-full w-1/4 flex-col items-center justify-center transition-all duration-300",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-primary/80"
            )}>
            <Icon
              className={cn("h-5 w-5 transition-all", isActive && "scale-110")}
            />
            <span
              className={cn(
                "mt-1 text-xs font-medium transition-all",
                isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
              )}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
