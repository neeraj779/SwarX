"use client";

import { useState, useEffect, useRef } from "react";

import { useQueueStore } from "@/stores/use-queue-store";
import {
  Loader2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useAudioPlayerContext } from "react-use-audio-player";

import { cn, formatDuration, getDownloadLink, getImageSrc } from "@/lib/utils";

import { ImageWithFallback } from "./image-with-fallback";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

export function MiniPlayer() {
  const {
    load,
    isPlaying,
    isLoading,
    togglePlayPause,
    duration,
    mute,
    unmute,
    isMuted,
    volume,
    setVolume,
    getPosition,
    seek,
    isReady,
  } = useAudioPlayerContext();

  const {
    currentTrack,
    skipToNextTrack,
    skipToPreviousTrack,
    isPlayerInitialized,
  } = useQueueStore();

  const [currentTime, setCurrentTime] = useState(0);
  const animationFrameRef = useRef<number>(0);
  const [isDraggingSeek, setIsDraggingSeek] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  useEffect(() => {
    if (currentTrack && isPlayerInitialized) {
      const audioSrc = getDownloadLink(currentTrack.download_url, "high");

      load(audioSrc, {
        html5: true,
        autoplay: true,
        initialMute: false,
        onend: () => {
          skipToNextTrack();
        },
      });
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentTrack, isPlayerInitialized, load, skipToNextTrack]);

  useEffect(() => {
    if (!isPlaying || isDraggingSeek || !isReady) return;

    const updateProgress = () => {
      setCurrentTime(getPosition());
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, getPosition, isDraggingSeek, isReady]);

  if (!currentTrack) return null;

  const handleProgressChange = (value: number[]) => {
    const newPosition = value[0];
    setSeekPosition(newPosition);
  };

  const handleProgressCommit = (value: number[]) => {
    if (duration > 0) {
      const newPosition = value[0];
      seek((newPosition * duration) / 100);
      setCurrentTime((newPosition * duration) / 100);
      setIsDraggingSeek(false);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);

    if (isMuted && value[0] > 0) {
      unmute();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  const progressPercentage =
    duration > 0
      ? isDraggingSeek
        ? seekPosition
        : (currentTime / duration) * 100
      : 0;

  return (
    <div className="border-border/30 bg-background/80 fixed right-0 bottom-[4rem] left-0 z-[60] border-t backdrop-blur-md sm:bottom-0 sm:left-64">
      <div className="relative -mt-[1px]">
        <Slider
          value={[progressPercentage]}
          max={100}
          step={0.1}
          onValueChange={handleProgressChange}
          onValueCommit={handleProgressCommit}
          onPointerDown={() => setIsDraggingSeek(true)}
          disabled={!isReady || duration <= 0}
          className="h-1 rounded-none"
          aria-label="Track progress"
        />
      </div>

      <div className="relative flex h-16 items-center justify-between gap-2 px-4">
        <div className="flex max-w-[40%] min-w-0 items-center gap-2 sm:max-w-[30%] sm:gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
            <ImageWithFallback
              src={getImageSrc(currentTrack.image, "low")}
              width={40}
              height={40}
              alt={currentTrack.name}
              priority
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

        <div className="flex items-center justify-center gap-1 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={skipToPreviousTrack}
            className="text-muted-foreground hover:text-primary h-8 w-8 sm:h-9 sm:w-9"
            aria-label="Previous track"
            disabled={!isReady}>
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
            )}
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={!isReady}>
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Play className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={skipToNextTrack}
            className="text-muted-foreground hover:text-primary h-8 w-8 sm:h-9 sm:w-9"
            aria-label="Next track"
            disabled={!isReady}>
            <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        <div className="hidden max-w-[30%] items-center gap-2 sm:flex">
          <div className="text-muted-foreground mr-2 flex items-center text-xs">
            <span>{formatDuration(currentTime, "mm:ss")}</span>
            <span className="mx-1">/</span>
            <span>{formatDuration(duration, "mm:ss")}</span>
          </div>

          <div className="flex w-24 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-muted-foreground hover:text-primary h-8 w-8"
              aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted || volume === 0 ? (
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
              aria-label="Volume"
            />
          </div>
        </div>

        <div className="text-muted-foreground flex items-center text-xs sm:hidden">
          <span>{formatDuration(currentTime, "mm:ss")}</span>
          <span className="mx-1">/</span>
          <span>{formatDuration(duration, "mm:ss")}</span>
        </div>
      </div>
    </div>
  );
}
