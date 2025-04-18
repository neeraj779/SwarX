import { Album } from "@/types/album.types";
import { Artist } from "@/types/artist.types";
import { ArtistMini } from "@/types/common.types";
import { Playlist } from "@/types/playlist.types";
import { Song } from "@/types/song.types";
import { Play, HeartIcon, ShareIcon, MoreHorizontal } from "lucide-react";

import { cn, getImageSrc } from "@/lib/utils";

import { ImageWithFallback } from "./image-with-fallback";
import { PlayButton } from "./play-button";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type DetailsHeaderProps = {
  item: Album | Song | Playlist | Artist;
};

export function DetailsHeader({ item }: DetailsHeaderProps) {
  const artistNames =
    "artist_map" in item &&
    item.artist_map?.primary_artists
      ?.map((artist: ArtistMini) => artist.name)
      .join(", ");

  return (
    <header className="to-background relative overflow-hidden bg-gradient-to-b from-black/30 backdrop-blur-xl">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={getImageSrc(item.image, "high")}
          fill
          alt=""
          className="scale-110 object-cover opacity-30 blur-md transition-all duration-700"
        />
        <div className="from-background via-background/80 to-background/20 absolute inset-0 bg-gradient-to-t" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:p-8 md:p-10 lg:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          {/* Cover Art */}
          <div
            className={cn(
              "group relative overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl",
              item.type === "artist"
                ? "mx-auto h-40 w-40 rounded-full sm:h-48 sm:w-48 md:mx-0 md:h-56 md:w-56 lg:h-64 lg:w-64"
                : "mx-auto h-40 w-40 rounded-2xl sm:h-48 sm:w-48 md:mx-0 md:h-56 md:w-56 lg:h-64 lg:w-64"
            )}>
            <ImageWithFallback
              src={getImageSrc(item.image, "high")}
              width={256}
              height={256}
              alt={item.name}
              className="size-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            />

            {/* Hover overlay with play button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <PlayButton
                type={item.type}
                token={
                  (item.type === "artist" ? item.urls.songs : item.url)
                    .split("/")
                    .pop()!
                }
                className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label={`Play ${item.name}`}>
                <Play size={20} fill="currentColor" />
              </PlayButton>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-end gap-4 text-center md:text-left">
            {/* Type & Title */}
            <div className="space-y-2">
              <p className="text-primary/90 text-xs font-bold tracking-widest uppercase">
                {item.type}
              </p>
              <h1 className="font-heading flex flex-wrap items-center justify-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl md:justify-start md:text-5xl lg:text-6xl">
                {item.name}
                {"explicit" in item && item.explicit && (
                  <Badge
                    variant="secondary"
                    className="h-5 translate-y-1 rounded-sm px-1.5 text-xs font-semibold">
                    E
                  </Badge>
                )}
              </h1>
            </div>

            {/* Creator & Info */}
            <div className="space-y-3">
              {artistNames && (
                <p className="text-foreground/90 hover:text-primary text-base font-medium transition-colors">
                  {artistNames}
                </p>
              )}
              {"subtitle" in item && item.subtitle && (
                <p className="text-muted-foreground text-sm">{item.subtitle}</p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-medium md:justify-start">
                {"year" in item && item.year && (
                  <span className="bg-muted/30 rounded-full px-3 py-1 backdrop-blur-sm">
                    {item.year}
                  </span>
                )}
                {"song_count" in item && item.song_count && (
                  <span className="bg-muted/30 rounded-full px-3 py-1 backdrop-blur-sm">
                    {item.song_count} song{item.song_count !== 1 ? "s" : ""}
                  </span>
                )}
                {"duration" in item && item.duration && (
                  <span className="bg-muted/30 rounded-full px-3 py-1 backdrop-blur-sm">
                    {item.duration}
                  </span>
                )}
                {"play_count" in item && item.play_count && (
                  <span className="bg-muted/30 rounded-full px-3 py-1 backdrop-blur-sm">
                    {item.play_count} plays
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {"header_desc" in item && item.header_desc && (
              <p className="text-muted-foreground/90 mx-auto max-w-2xl text-sm leading-relaxed md:mx-0">
                {item.header_desc}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:mt-8 md:justify-start lg:mt-10">
          <PlayButton
            type={item.type}
            token={
              (item.type === "artist" ? item.urls.songs : item.url)
                .split("/")
                .pop()!
            }
            className="group/play bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/25 flex h-14 items-center gap-2 rounded-full px-6 shadow-xl transition-all duration-300 hover:scale-105 active:scale-100">
            <Play
              size={22}
              fill="currentColor"
              className="transition-transform duration-200 group-hover/play:scale-105"
            />
            <span className="font-medium">Play</span>
          </PlayButton>

          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-muted/30 hover:bg-muted/50 h-10 w-10 rounded-full backdrop-blur-sm">
                  <HeartIcon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Like</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-muted/30 hover:bg-muted/50 h-10 w-10 rounded-full backdrop-blur-sm">
                  <ShareIcon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-muted/30 hover:bg-muted/50 h-10 w-10 rounded-full backdrop-blur-sm">
                  <MoreHorizontal size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More options</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
