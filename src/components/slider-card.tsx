import type { MediaQuality, EntityType } from "@/types/common.types";
import { PlayCircle } from "lucide-react";

import { cn, getImageSrc } from "@/lib/utils";

import { ImageWithFallback } from "./image-with-fallback";
import { Badge } from "./ui/badge";

export type SliderCardProps = {
  name: string;
  type: EntityType;
  url: string;
  image: MediaQuality;
  explicit?: boolean;
  subtitle?: string;
  className?: string;
  aspect?: "square" | "video";
  hidePlayButton?: boolean;
  isCurrentSeason?: boolean;
};

export function SliderCard(props: SliderCardProps) {
  const {
    type,
    image,
    name,
    subtitle,
    explicit,
    aspect = "square",
    isCurrentSeason,
    className,
  } = props;

  const imageSrc = getImageSrc(image, "high");

  return (
    <div
      title={name}
      className={cn(
        "group relative w-32 cursor-pointer transition-all duration-300 hover:z-10 sm:w-36 md:w-48 lg:w-56",
        aspect === "video" && "w-44 sm:w-48 md:w-64 lg:w-72",
        isCurrentSeason &&
          "ring-ring ring-offset-background ring-2 ring-offset-2",
        className
      )}>
      <div className="size-full">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md",
            aspect === "square" ? "aspect-square" : "aspect-video",
            ["radio_station", "artist"].includes(type) &&
              "border-primary/10 rounded-full border"
          )}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <ImageWithFallback
            src={imageSrc}
            width={200}
            height={200}
            alt={name}
            className={cn(
              "size-full object-cover transition-all duration-300",
              !imageSrc && "dark:invert",
              imageSrc.includes("default") && "dark:invert"
            )}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="flex size-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform duration-300">
              <PlayCircle className="size-6 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex w-full flex-col items-start justify-between">
          <h4 className="w-full">
            <div className="flex items-center">
              {explicit && (
                <Badge className="bg-primary/10 text-primary mr-1.5 rounded-sm px-1 py-0 text-[10px] font-medium">
                  E
                </Badge>
              )}
              <span className="text-foreground/95 group-hover:text-foreground truncate text-base font-medium transition-colors duration-300">
                {name}
              </span>
            </div>
          </h4>

          <span className="text-secondary-foreground/60 group-hover:text-secondary-foreground/80 line-clamp-2 w-full text-left text-xs font-medium tracking-tight transition-colors duration-300">
            {subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
