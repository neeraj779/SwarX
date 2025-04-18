import { Song } from "@/types/song.types";
import { Play } from "lucide-react";

import { cn, formatDuration, getImageSrc } from "@/lib/utils";

import { ImageWithFallback } from "./image-with-fallback";
import { PlayButton } from "./play-button";
import { Badge } from "./ui/badge";

interface SongListProps {
  songs: Song[];
  className?: string;
}

export function SongList({ songs, className }: SongListProps) {
  return (
    <div className={cn("w-full space-y-1", className)}>
      <div className="text-muted-foreground grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-2 text-sm">
        <div className="w-8 text-center">#</div>
        <div>Title</div>
        <div className="pr-2">Duration</div>
      </div>

      <div className="space-y-[2px]">
        {songs.map((song, index) => {
          const playToken = song.url?.split("/").pop() ?? "";
          const artistNames = song.artist_map.primary_artists
            .map((a) => a.name)
            .join(", ");
          const imageSrc = getImageSrc(song.image, "low");

          return (
            <div
              key={song.id}
              className="group hover:bg-muted/80 grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md px-4 py-2 transition-colors">
              {/* Track Number/Play Button */}
              <div className="relative w-8 text-center">
                <span className="text-muted-foreground text-sm group-hover:invisible">
                  {index + 1}
                </span>
                <div className="invisible absolute inset-0 flex items-center justify-center group-hover:visible">
                  <PlayButton
                    type="song"
                    token={playToken}
                    className="group/play hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                    aria-label={`Play ${song.name}`}>
                    <Play
                      size={16}
                      className="text-foreground/80 group-hover/play:text-foreground transition-colors"
                    />
                  </PlayButton>
                </div>
              </div>

              {/* Song Info */}
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative aspect-square h-10 w-10 shrink-0 overflow-hidden rounded">
                  <ImageWithFallback
                    src={imageSrc}
                    alt={song.name}
                    width={40}
                    height={40}
                    className={cn(
                      "size-full object-cover",
                      !imageSrc && "dark:invert",
                      imageSrc?.includes("default") && "dark:invert"
                    )}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-foreground truncate text-sm font-medium">
                      {song.name}
                    </h3>
                    {song.explicit && (
                      <Badge
                        variant="secondary"
                        className="h-4 shrink-0 rounded-sm px-1 py-0 text-[10px] leading-tight font-semibold">
                        E
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground truncate text-xs">
                    {artistNames}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="text-muted-foreground shrink-0 text-sm">
                {formatDuration(song.duration, "mm:ss")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
