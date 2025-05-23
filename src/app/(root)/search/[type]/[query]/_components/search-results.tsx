"use client";

// import { SongListClient } from "@/components/song-list/song-list.client";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { search } from "@/services/saavnify.service";
import { Album } from "@/types/album.types";
import { SearchReturnType } from "@/types/search.types";
import { Song } from "@/types/song.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { SliderCard } from "@/components/slider-card";
import { SongList } from "@/components/song-list";

type SearchResultsProps = {
  query: string;
  type: "song" | "album" | "playlist" | "artist" | "show";
  initialSearchResults: SearchReturnType;
};

export function SearchResults(props: SearchResultsProps) {
  const { query, type, initialSearchResults } = props;

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["search-results", type, query],
      queryFn: ({ pageParam }) => search(query, type, pageParam, 50),
      getNextPageParam: ({ total }, allPages) =>
        allPages.length * 50 < total ? allPages.length + 1 : undefined,
      initialPageParam: 1,
      initialData: { pages: [initialSearchResults], pageParams: [1] },
    });

  const searchResults = data.pages.flatMap(
    (page) => page.results as (Album | Song)[]
  );

  console.log(searchResults);

  const [ref] = useIntersectionObserver({
    threshold: 0.5,
    onChange(isIntersecting) {
      if (isIntersecting) {
        fetchNextPage();
      }
    },
  });

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
      {type === "song" ? (
        <SongList songs={searchResults as Song[]} />
      ) : (
        <div className="flex w-full flex-wrap justify-between gap-y-4">
          {searchResults.map(({ id, name, url, subtitle, type, image }) => (
            <SliderCard
              key={`${id}-${name}`}
              name={name}
              url={url}
              subtitle={subtitle}
              type={type}
              image={image}
            />
          ))}
        </div>
      )}

      {hasNextPage ? (
        <div
          ref={ref}
          className="text-muted-foreground flex items-center justify-center gap-2 font-bold">
          {isFetchingNextPage && (
            <>
              <Loader2 className="size-5 animate-spin" /> Loading...
            </>
          )}
        </div>
      ) : (
        <h3 className="font-heading py-6 text-center text-xl drop-shadow-md sm:text-2xl md:text-3xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent">
          <em>Yay! You have seen it all</em>{" "}
          <span className="text-foreground">🤩</span>
        </h3>
      )}
    </div>
  );
}
