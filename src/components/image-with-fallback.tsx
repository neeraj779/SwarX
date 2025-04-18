"use client";

import { useState, useEffect } from "react";

import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

export function ImageWithFallback(props: ImageProps) {
  const { alt, src, className, ...restProps } = props;
  const fallbackSrc = "/placeholder.jpg";

  const [imgSrc, setImgSrc] = useState<string>(
    typeof src === "string" && src.trim() ? src : fallbackSrc
  );
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (typeof src === "string" && src.trim()) {
      setImgSrc(src);
      setHasError(false);
      setLoading(true);
    } else {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setLoading(false);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
      setLoading(false);
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative h-fit w-fit">
      {loading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <Image
        {...restProps}
        src={imgSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          className,
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-500",
          hasError && "dark:invert"
        )}
      />
    </div>
  );
}
