"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { useDebounce } from "@/hooks/use-debounce-value";
import { useEventListener } from "@/hooks/use-event-listener";
import { searchAll } from "@/services/saavnify.service";
import type { AllSearch } from "@/types/search.types";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { SearchAll } from "./search-all";

type SearchMenuProps = {
  className?: string;
  topSearch: React.ReactNode;
};

export function SearchMenu({ topSearch, className }: SearchMenuProps) {
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<AllSearch | null>(null);

  const debouncedQuery = useDebounce(query.trim(), 1000);

  // const [_, setIsTyping] = useIsTyping();

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsOpen((isOpen) => !isOpen);
    }
  });

  // useEffect(() => {
  //   if (isOpen) {
  //     setIsTyping(true);
  //   } else {
  //     setIsTyping(false);
  //     setQuery("");
  //   }
  // }, [isOpen, setIsTyping]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    (async () => {
      if (!debouncedQuery) return setSearchResult(null);
      setIsLoading(true);
      const data = await searchAll(debouncedQuery);
      setIsLoading(false);
      setSearchResult(data);
    })();
  }, [debouncedQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "flex size-10 p-0 shadow-sm lg:w-60 lg:justify-start lg:px-3 lg:py-2",
            className
          )}>
          <Search aria-hidden="true" className="inline-block size-4 lg:mr-2" />
          <span className="sr-only">Search</span>

          <span className="hidden lg:inline-block">Search...</span>

          <kbd className="bg-muted pointer-events-none ml-auto hidden h-6 items-center rounded border px-1.5 font-mono text-[10px] font-medium select-none lg:block">
            <span className="text-xs">{"⌘"}</span> K
          </kbd>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-7xl shadow-md">
        <div className="relative mt-4 mr-4">
          <Search className="text-muted-foreground absolute top-3 left-2 size-4" />

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-8"
          />
        </div>

        {debouncedQuery.length ? (
          isLoading ? (
            <div className="border-primary m-auto aspect-square h-16 animate-spin rounded-full border-y-2 py-10 lg:h-32">
              <span className="sr-only">Loading Results</span>
            </div>
          ) : (
            searchResult && <SearchAll query={query} data={searchResult} />
          )
        ) : (
          topSearch
        )}
      </DialogContent>
    </Dialog>
  );
}
