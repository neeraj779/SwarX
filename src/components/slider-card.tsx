import Link from "next/link";

import type { MediaQuality, EntityType } from "@/types/common.types";
import { Play } from "lucide-react";

import { cn, getHref, getImageSrc } from "@/lib/utils";

import { ImageWithFallback } from "./image-with-fallback";
import { PlayButton } from "./play-button";
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
    url,
    image,
    name,
    subtitle,
    explicit,
    aspect = "square",
    isCurrentSeason,
    hidePlayButton,
    className,
  } = props;

  const imageSrc = getImageSrc(image, "high");
  const isCircular = ["radio_station", "artist"].includes(type);
  const playToken = url?.split("/").pop() ?? "";

  return (
    <div
      title={name}
      className={cn(
        "group relative cursor-pointer transition-all duration-300 ease-in-out",
        "w-36 sm:w-40 md:w-48 lg:w-56",
        aspect === "video" && "w-44 sm:w-52 md:w-64 lg:w-72",
        "hover:z-10",
        isCurrentSeason &&
          "ring-primary ring-offset-background rounded-lg ring-2 ring-offset-2",
        className
      )}>
      <div
        className={cn(
          "relative w-full overflow-hidden transition-all duration-300 ease-in-out",
          "shadow-md group-hover:shadow-xl",
          aspect === "square" ? "aspect-square" : "aspect-video",
          isCircular ? "border-border/80 rounded-full border" : "rounded-lg"
        )}>
        <ImageWithFallback
          src={imageSrc}
          width={300}
          height={300}
          alt={name}
          className={cn(
            "size-full object-cover transition-all duration-300 ease-in-out",
            !imageSrc && "dark:invert",
            imageSrc?.includes("default") && "dark:invert"
          )}
        />

        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300 ease-in-out",
            "bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100"
          )}
        />

        {!hidePlayButton && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out",
              "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            )}>
            <PlayButton
              type={type}
              token={playToken}
              className={cn(
                "group/play z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ease-in-out",
                "bg-primary/80 text-primary-foreground shadow-lg backdrop-blur-sm",
                "hover:bg-primary hover:scale-110",
                "active:bg-primary/90 active:scale-100"
              )}
              aria-label={`Play ${name}`}>
              <Play
                fill="currentColor"
                strokeWidth={1.5}
                className="h-5 w-5 transition-transform duration-200 ease-in-out"
              />
            </PlayButton>
          </div>
        )}
      </div>

      <div className="mt-2.5 flex w-full flex-col items-start px-1">
        <h4 className="text-foreground w-full truncate text-sm font-medium">
          <Link
            href={getHref(url, type)}
            className="flex items-center gap-x-1.5">
            {explicit && (
              <Badge
                variant="secondary"
                className="h-4 rounded-sm px-1 py-0 text-[10px] leading-tight font-semibold">
                E
              </Badge>
            )}
            <span>{name}</span>
          </Link>
        </h4>
        {subtitle && (
          <p
            className="text-muted-foreground line-clamp-1 w-full text-left text-xs"
            title={subtitle}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
