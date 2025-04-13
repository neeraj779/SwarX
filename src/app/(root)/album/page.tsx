import { Language } from "@/constants/language.constants";
import { getTopAlbums } from "@/services/saavnify.service";
import { DiscIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { LanguageBar } from "@/components/language-bar";

import { TopAlbums } from "./_components/top-albums";

type PageProps = { searchParams: Promise<{ page?: number; lang?: Language }> };

export default async function AlbumsPage({ searchParams }: PageProps) {
  const { page = 1, lang } = await searchParams;

  const topAlbums = await getTopAlbums(page, 50, lang);

  return (
    <div className="from-background via-background/95 to-background/90 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
        <div className="mb-8 flex flex-col gap-6">
          <LanguageBar language={lang} />

          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <DiscIcon className="text-primary size-6" />
              <h1
                className={cn(
                  "font-heading text-2xl capitalize",
                  "from-foreground to-foreground/70 bg-gradient-to-br bg-clip-text text-transparent",
                  "dark:from-neutral-200 dark:to-neutral-600"
                )}>
                {lang ? `${lang} Music` : "Top"} Albums
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              {lang
                ? `Explore popular ${lang} albums from top artists. Find new and classic releases to add to your collection.`
                : "Discover the most popular albums across various genres. From new releases to timeless classics, find music that resonates with you."}
            </p>
          </div>
        </div>

        <TopAlbums
          key={topAlbums.data[0]?.id || "default"}
          initialAlbums={topAlbums}
          lang={lang}
        />
      </div>
    </div>
  );
}
