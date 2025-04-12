"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import Image from "next/image";
import type { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

export function ImageWithFallback(props: ImageProps) {
  const { alt, src, className, ...restProps } = props;

  const [error, setError] = useState<SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(null);
    setLoading(true);
  }, [src]);

  return (
    <div className="relative h-fit w-fit">
      {loading && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        onError={setError}
        onLoadingComplete={() => setLoading(false)}
        className={cn(
          className,
          loading ? "opacity-0" : "opacity-100 transition-opacity duration-500",
          error && "dark:invert"
        )}
        {...restProps}
      />
    </div>
  );
}
