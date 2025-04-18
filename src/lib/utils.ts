import {
  EntityType,
  ImageQuality,
  MediaQuality,
  StreamQuality,
} from "@/types/common.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHref(url: string, type: EntityType) {
  const token = url.split("/").at(-1);
  return `/${type}/${token}`;
}

export function getImageSrc(
  image: MediaQuality,
  quality: ImageQuality
): string {
  const qualityIndex: Record<ImageQuality, number> = {
    low: 0,
    medium: 1,
    high: 2,
  };

  const link =
    typeof image === "string"
      ? image
      : (image[qualityIndex[quality]]?.link ?? "");

  return link.replace(/^http:\/\//, "https://");
}

export function getDownloadLink(
  url: MediaQuality,
  quality: StreamQuality
): string {
  const qualityIndex: Record<StreamQuality, number> = {
    poor: 0,
    low: 1,
    medium: 2,
    high: 3,
    excellent: 4,
  };

  return typeof url === "string"
    ? url
    : (url[qualityIndex[quality]]?.link ?? "");
}

export function formatDuration(
  seconds: number,
  format: "hh:mm:ss" | "mm:ss"
): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return format === "hh:mm:ss"
    ? `${pad(hrs)}:${pad(mins)}:${pad(secs)}`
    : `${pad(mins + hrs * 60)}:${pad(secs)}`;
}
