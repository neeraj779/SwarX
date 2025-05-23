"use client";

import React, { useEffect, useState, useCallback } from "react";

import { useDebounceValue } from "@/hooks/use-debounce-value";
import { searchAll } from "@/services/saavnify.service";
import type { AllSearch } from "@/types/search.types";
import { Loader2, Search } from "lucide-react";

import { SearchAll } from "@/components/search/search-all";
import { Input } from "@/components/ui/input";

type MobileSearchProps = {
  topSearch: React.JSX.Element;
};

export function MobileSearch({ topSearch }: MobileSearchProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<AllSearch | null>(null);

  const [debouncedValue] = useDebounceValue(query.trim(), 500);

  const fetchSearchResults = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      setSearchResult(null);
      return;
    }

    try {
      setIsLoading(true);
      const data = await searchAll(searchQuery);
      setSearchResult(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSearchResults(debouncedValue);
  }, [debouncedValue, fetchSearchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className="relative mx-auto max-w-md">
        <Search className="text-muted-foreground absolute top-3 left-2 size-4" />
        <Input
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          className="pl-8"
          aria-label="Search"
        />
      </div>

      {!debouncedValue && topSearch}

      {isLoading && (
        <div className="text-muted-foreground text-center text-xs">
          <Loader2 className="mr-2 inline-block animate-spin" /> Loading Results
        </div>
      )}

      {searchResult && <SearchAll query={query} data={searchResult} />}
    </>
  );
}
