"use client";

import React from "react";

import { Language } from "@/constants/language.constants";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { getTopAlbums } from "@/services/saavnify.service";
import type { TopAlbums as TopAlbumsType } from "@/types/explore.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, SparklesIcon, DiscIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { SliderCard } from "@/components/slider-card";

type Props = {
  initialAlbums: TopAlbumsType;
  lang?: Language;
};
export function TopAlbums({ initialAlbums, lang }: Props) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["top-albums", lang],
      queryFn: ({ pageParam }) => getTopAlbums(pageParam, 50, lang),
      getNextPageParam: ({ last_page }, allPages) =>
        last_page ? null : allPages.length + 1,
      initialPageParam: 1,
      initialData: { pages: [initialAlbums], pageParams: [1] },
    });

  const topAlbums = data.pages.flatMap((page) => page.data);

  const [ref] = useIntersectionObserver({
    threshold: 0.5,
    onChange(isIntersecting) {
      if (isIntersecting) {
        fetchNextPage();
      }
    },
  });

  return (
    <div className="py-6">
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="text-primary size-6 animate-spin" />
        </div>
      ) : topAlbums.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <DiscIcon className="text-muted-foreground/60 size-10" />
          <h3 className="text-muted-foreground text-center text-lg font-medium">
            No albums found
          </h3>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6",
              "animate-in fade-in duration-500"
            )}>
            {topAlbums.map(
              ({ id, name, url, subtitle, type, image, explicit }) => (
                <div key={id} className="flex justify-center">
                  <SliderCard
                    name={name}
                    url={url}
                    subtitle={subtitle}
                    type={type}
                    image={image}
                    explicit={explicit}
                    aspect="square"
                    className="!w-full !max-w-[180px] md:!max-w-[200px]"
                  />
                </div>
              )
            )}
          </div>

          {hasNextPage ? (
            <div
              ref={ref}
              className="text-muted-foreground mt-8 flex items-center justify-center gap-2 font-bold">
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="text-primary size-5 animate-spin" />{" "}
                  Loading more albums...
                </>
              ) : (
                <p className="text-muted-foreground/80 text-sm">
                  Scroll for more albums
                </p>
              )}
            </div>
          ) : (
            <div className="mt-8 text-center">
              <div className="bg-success/10 inline-flex items-center gap-1.5 rounded-full px-4 py-2">
                <SparklesIcon className="text-success size-4" />
                <h3 className="text-success font-medium">
                  You&apos;ve explored all albums!
                </h3>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
