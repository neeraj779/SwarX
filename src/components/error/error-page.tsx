"use client";

import { useRouter } from "next/navigation";

import { AlertCircle, Home, RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  showHomeButton?: boolean;
  className?: string;
  reset?: () => void;
}

export function ErrorPage({
  title = "Oops! Something went wrong",
  message = "We encountered an unexpected error. Don't worry, our team has been notified.",
  showRetry = true,
  showHomeButton = true,
  className,
  reset,
}: ErrorPageProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "from-background to-background/80 flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-gradient-to-b p-4 text-center",
        className
      )}>
      <div className="relative">
        {/* Explosion effect */}
        <div className="bg-destructive/20 absolute inset-0 animate-pulse rounded-full blur-xl" />

        {/* Error icon with animation */}
        <div className="relative">
          <div className="animate-bounce">
            <AlertCircle className="text-destructive h-24 w-24" />
          </div>
          <div className="bg-destructive/50 absolute -top-2 -right-2 h-6 w-6 animate-ping rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-md text-sm sm:text-base">
          {message}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {showRetry && (
          <Button
            variant="outline"
            onClick={() => {
              if (reset) {
                reset();
              } else {
                router.refresh();
              }
            }}
            className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
        {showHomeButton && (
          <Button onClick={() => router.push("/")} className="gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="from-background absolute right-0 bottom-0 left-0 h-1/4 bg-gradient-to-t to-transparent" />
    </div>
  );
}
