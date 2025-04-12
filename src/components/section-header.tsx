import { ReactNode } from "react";

import { ChevronRight, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  badge?: {
    text: string;
    icon?: LucideIcon;
  };
  actionText?: string;
  children?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  icon: Icon,
  badge,
  actionText = "Explore",
  children,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex min-w-0 items-center gap-2">
        {Icon && (
          <Icon size={16} className="text-primary shrink-0 opacity-80" />
        )}
        <h2 className="from-foreground to-foreground/70 min-w-0 truncate bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent">
          {title}
        </h2>
        {badge && (
          <div className="bg-primary/10 text-primary flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium">
            {badge.icon && <badge.icon size={10} className="mr-1" />}
            <span>{badge.text}</span>
          </div>
        )}
        {children}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-accent/10 group ml-2 flex h-8 shrink-0 items-center gap-1 rounded-full px-3">
        <span className="text-xs font-medium">{actionText}</span>
        <ChevronRight
          size={14}
          className="text-primary transition-transform group-hover:translate-x-0.5"
        />
      </Button>
    </div>
  );
}

export function SectionBanner({
  icon: Icon,
  title,
  subtitle,
  gradient = "from-primary/20 to-primary/5",
  iconSize = 80,
  className,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  gradient?: string;
  iconSize?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-16 overflow-hidden rounded-lg bg-gradient-to-r backdrop-blur-sm sm:h-20",
        gradient,
        className
      )}>
      <div className="absolute -right-6 -bottom-6 opacity-10">
        <Icon size={iconSize} className="text-primary" />
      </div>
      <div className="absolute inset-0 flex items-center px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 rounded-full p-2">
            <Icon size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium sm:text-base">{title}</h3>
            <p className="text-2xs text-muted-foreground sm:text-xs">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
