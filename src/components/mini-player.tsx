"use client";

import { useState, useEffect } from "react";

import Image from "next/image";

import { useQueueStore } from "@/stores/use-queue-store";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useAudioPlayerContext } from "react-use-audio-player";

import { cn, getDownloadLink, getImageSrc } from "@/lib/utils";

import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

export function MiniPlayer() {
  const {
    load,
    isPlaying,
    togglePlayPause,
    duration,
    mute,
    volume,
    isMuted,
    setVolume,
  } = useAudioPlayerContext();

  const {
    currentTrack,
    skipToNextTrack,
    skipToPreviousTrack,
    isPlayerInitialized,
  } = useQueueStore();
  const [currentTime] = useState(0);

  // Update current time
  useEffect(() => {
    if (currentTrack && isPlayerInitialized) {
      const audioSrc = getDownloadLink(currentTrack.download_url, "high");

      load(audioSrc, {
        html5: true,
        autoplay: true,
        initialMute: false,
        // onend: onEndHandler,
      });
    }
  }, [currentTrack, isPlayerInitialized, load]);
  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <div className="border-border/30 bg-background/80 fixed right-0 bottom-[4rem] left-0 z-[60] border-t backdrop-blur-md sm:bottom-0 sm:left-64">
      {/* Progress Bar (Always visible) */}
      <div className="relative h-1 w-full">
        <div className="bg-muted/30 absolute inset-0" />
        <div
          className="bg-primary absolute h-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative flex h-16 items-center justify-between gap-2 px-4">
        {/* Song Info - Left aligned and responsive */}
        <div className="flex max-w-[40%] min-w-0 items-center gap-2 sm:max-w-[30%] sm:gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
            <Image
              src={getImageSrc(currentTrack.image, "low")}
              width={40}
              height={40}
              alt={currentTrack.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium">
              {currentTrack.name}
            </h3>
            <p className="text-muted-foreground truncate text-xs">
              {currentTrack.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>

        {/* Player Controls - Center aligned for all screen sizes */}
        <div className="flex items-center justify-center gap-1 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={skipToPreviousTrack}
            className="text-muted-foreground hover:text-primary h-8 w-8 sm:h-9 sm:w-9">
            <SkipBack className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            onClick={togglePlayPause}
            className={cn(
              "flex items-center justify-center rounded-full",
              "h-10 w-10 sm:h-11 sm:w-11",
              "transform transition-all duration-300",
              isPlaying
                ? "bg-primary text-primary-foreground"
                : "bg-primary/90 text-primary-foreground hover:bg-primary"
            )}>
            {isPlaying ? (
              <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Play className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={skipToNextTrack}
            className="text-muted-foreground hover:text-primary h-8 w-8 sm:h-9 sm:w-9">
            <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Time and Volume Controls - Right aligned */}
        <div className="hidden max-w-[30%] items-center gap-2 sm:flex">
          <div className="text-muted-foreground mr-2 flex items-center text-xs">
            <span>{formatTime(currentTime)}</span>
            <span className="mx-1">/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex w-24 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={mute}
              className="text-muted-foreground hover:text-primary h-8 w-8">
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-16"
            />
          </div>
        </div>

        {/* Mobile-only time display */}
        <div className="text-muted-foreground flex items-center text-xs sm:hidden">
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
}
