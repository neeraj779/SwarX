import { getCharts } from "@/services/saavnify.service";
import { BarChart3Icon, SparklesIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { SliderCard } from "@/components/slider-card";

export default async function ChartsPage() {
  const charts = await getCharts();

  return (
    <div className="from-background via-background/95 to-background/90 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
        <div className="mb-8 flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <BarChart3Icon className="text-primary size-6" />
              <h1
                className={cn(
                  "font-heading text-2xl capitalize",
                  "from-foreground to-foreground/70 bg-gradient-to-br bg-clip-text text-transparent",
                  "dark:from-neutral-200 dark:to-neutral-600"
                )}>
                Top Music Charts
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Discover the hottest charts and playlists trending right now. Stay
              up-to-date with what&apos;s popular across different genres and
              moods.
            </p>
          </div>
        </div>

        <div className="py-6">
          <div
            className={cn(
              "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6",
              "animate-in fade-in duration-500"
            )}>
            {charts.map(
              ({ id, name, url, subtitle, type, image, explicit }) => (
                <div key={id} className="flex justify-center">
                  <SliderCard
                    name={name}
                    url={url}
                    subtitle={subtitle}
                    type={type}
                    image={image}
                    explicit={explicit}
                    aspect="square"
                    className="!w-full !max-w-[180px] md:!max-w-[200px]"
                  />
                </div>
              )
            )}
          </div>

          <div className="mt-8 text-center">
            <div className="bg-success/10 inline-flex items-center gap-1.5 rounded-full px-4 py-2">
              <SparklesIcon className="text-success size-4" />
              <h3 className="text-success font-medium">
                You&apos;ve explored all charts!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
