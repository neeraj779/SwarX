import { cn } from "@/lib/utils";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleton() {
  return (
    <div className="from-background via-background/95 to-background/90 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "mb-8 last:mb-0 sm:mb-10 md:mb-12",
              index === 0 && "mt-2 sm:mt-4"
            )}>
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>

            <ScrollArea className="w-full">
              <div className="flex gap-3 pb-3 sm:gap-4 sm:pb-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex w-[200px] flex-col gap-2">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
}
