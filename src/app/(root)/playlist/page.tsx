import { Language } from "@/constants/language.constants";
import { getFeaturedPlaylists } from "@/services/saavnify.service";
import { HeadphonesIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { LanguageBar } from "@/components/language-bar";

import { FeaturedPlaylists } from "./_components/featured-playlists";

type PageProps = { searchParams: Promise<{ page?: number; lang?: Language }> };

export default async function PlaylistsPage({ searchParams }: PageProps) {
  const { page = 1, lang } = await searchParams;

  const featuredPlaylists = await getFeaturedPlaylists(page, 50, lang);

  return (
    <div className="from-background via-background/95 to-background/90 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
        <div className="mb-8 flex flex-col gap-6">
          <LanguageBar language={lang} />

          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <HeadphonesIcon className="text-primary size-6" />
              <h1
                className={cn(
                  "font-heading text-2xl capitalize",
                  "from-foreground to-foreground/70 bg-gradient-to-br bg-clip-text text-transparent",
                  "dark:from-neutral-200 dark:to-neutral-600"
                )}>
                {lang ? `${lang} Music` : "Discover"} Playlists
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
              {lang
                ? `Explore popular ${lang} playlists curated for every mood and occasion. Find the perfect soundtrack for your day.`
                : "Discover carefully curated playlists across genres and moods. From workout energy to relaxation, find the perfect soundtrack."}
            </p>
          </div>
        </div>

        <FeaturedPlaylists
          key={featuredPlaylists.data[0]?.id || "default"}
          initialPlaylists={featuredPlaylists}
          lang={lang}
        />
      </div>
    </div>
  );
}
