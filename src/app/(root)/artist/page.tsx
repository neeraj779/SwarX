import { getTopArtists } from "@/services/saavnify.service";
import { MicIcon, SparklesIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { SliderCard } from "@/components/slider-card";

export default async function TopArtistsPage() {
  const topArtists = await getTopArtists();

  return (
    <div className="from-background via-background/95 to-background/90 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
        <div className="mb-8 flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <MicIcon className="text-primary size-6" />
              <h1
                className={cn(
                  "font-heading text-2xl capitalize",
                  "from-foreground to-foreground/70 bg-gradient-to-br bg-clip-text text-transparent",
                  "dark:from-neutral-200 dark:to-neutral-600"
                )}>
                Top Artists
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              Discover the most popular artists right now. Follow your favorites
              and stay updated with their latest releases and trending tracks.
            </p>
          </div>
        </div>

        <div className="py-6">
          <div
            className={cn(
              "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6",
              "animate-in fade-in duration-500"
            )}>
            {topArtists.map(({ id, name, url, follower_count, image }) => (
              <div key={id} className="flex justify-center">
                <SliderCard
                  name={name}
                  url={url}
                  subtitle={`${follower_count.toLocaleString()} Fans`}
                  type="artist"
                  image={image}
                  aspect="square"
                  className="!w-full !max-w-[180px] md:!max-w-[200px]"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="bg-success/10 inline-flex items-center gap-1.5 rounded-full px-4 py-2">
              <SparklesIcon className="text-success size-4" />
              <h3 className="text-success font-medium">
                You&apos;ve explored all artists!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
