import type { MediaQuality, EntityType } from "@/types/common.types";
import { PlayCircle } from "lucide-react";

import { cn, getImageSrc } from "@/lib/utils";

import { ImageWithFallback } from "./image-with-fallback";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

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
    <Card
      title={name}
      className={cn(
        "group relative w-32 cursor-pointer border-none bg-transparent transition-all duration-500 hover:z-10 hover:scale-105 sm:w-36 md:w-48 lg:w-56",
        aspect === "video" && "w-44 sm:w-48 md:w-64 lg:w-72",
        isCurrentSeason &&
          "ring-ring ring-offset-background ring-2 ring-offset-2",
        className
      )}>
      <CardContent className="size-full p-2">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-xl shadow-lg transition-all duration-500 group-hover:shadow-2xl",
            aspect === "square" ? "aspect-square" : "aspect-video",
            ["radio_station", "artist"].includes(type) &&
              "border-primary/20 rounded-full border-2"
          )}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <ImageWithFallback
            src={imageSrc}
            width={200}
            height={200}
            alt={name}
            className={cn(
              "size-full object-cover transition-all duration-700 group-hover:scale-110",
              !imageSrc && "dark:invert",
              imageSrc.includes("default") && "dark:invert"
            )}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
            <div className="flex size-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
              <PlayCircle className="size-8 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        <div className="mt-3 flex w-full flex-col items-center justify-between">
          <h4 className="w-full font-medium lg:text-lg">
            <div className="mx-auto flex max-w-fit items-center">
              {explicit && (
                <Badge className="bg-primary/10 text-primary mr-1.5 rounded-sm px-1 py-0 text-[10px] font-medium">
                  E
                </Badge>
              )}
              <span className="text-foreground/90 group-hover:text-foreground truncate transition-colors duration-300">
                {name}
              </span>
            </div>
          </h4>

          <span className="text-secondary-foreground/80 group-hover:text-secondary-foreground w-full truncate text-center text-xs capitalize transition-colors duration-300">
            {subtitle}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
