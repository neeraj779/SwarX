import {
  ImageQuality,
  MediaQuality,
  StreamQuality,
} from "@/types/common.types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
