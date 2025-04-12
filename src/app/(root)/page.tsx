import { getHomeData } from "@/services/saavnify.service";
import {
  Music,
  TrendingUp,
  Album,
  BarChart,
  Radio,
  PlayCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { SectionHeader } from "@/components/section-header";
import { SliderCard } from "@/components/slider-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const getSectionConfig = (key: string) => {
  switch (key) {
    case "trending":
      return {
        icon: TrendingUp,
        badge: { text: "Hot", icon: TrendingUp },
        bannerTitle: "Trending Now",
        bannerSubtitle: "What's hot in the music world",
      };
    case "albums":
      return {
        icon: Album,
        badge: { text: "New", icon: Album },
        bannerTitle: "Latest Albums",
        bannerSubtitle: "Fresh releases from your favorite artists",
      };
    case "charts":
      return {
        icon: BarChart,
        badge: { text: "Top", icon: BarChart },
        bannerTitle: "Top Charts",
        bannerSubtitle: "The most popular tracks right now",
      };
    case "radio":
      return {
        icon: Radio,
        badge: { text: "Live", icon: Radio },
        bannerTitle: "Radio Stations",
        bannerSubtitle: "Tune in to your favorite stations",
      };
    default:
      return {
        icon: Music,
        badge: { text: "Discover", icon: PlayCircle },
        bannerTitle: "Discover Music",
        bannerSubtitle: "Explore new sounds and artists",
      };
  }
};

export default async function Home() {
  const homedata = await getHomeData();

  return (
    <div className="from-background via-background/95 to-background/90 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
        {Object.entries(homedata).map(([key, section], index) => {
          const isEmptySection =
            typeof section === "object" &&
            "data" in section &&
            (!section.data || section.data.length === 0);

          const isSkippableSection =
            "random_songs_listid" in section || key === "discover";

          if (isEmptySection || isSkippableSection) return null;

          const config = getSectionConfig(key);

          return (
            <div
              key={key}
              className={cn(
                "mb-8 last:mb-0 sm:mb-10 md:mb-12",
                index === 0 && "mt-2 sm:mt-4"
              )}>
              <SectionHeader
                title={section.title}
                icon={config.icon}
                badge={config.badge}
                className="mb-3 sm:mb-4"
              />

              <ScrollArea className="w-full">
                <div className="flex gap-3 pb-3 sm:gap-4 sm:pb-4">
                  {section.data.map(
                    ({ id, name, url, subtitle, type, image, explicit }) => (
                      <SliderCard
                        key={id}
                        name={name}
                        url={url}
                        subtitle={subtitle}
                        type={type}
                        image={image}
                        explicit={explicit}
                      />
                    )
                  )}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          );
        })}
      </div>
    </div>
  );
}
