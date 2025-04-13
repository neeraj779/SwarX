import Link from "next/link";

import { Language, SUPPORTED_LANGUAGES } from "@/constants/language.constants";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type LanguageBarProps = { language?: Language };

export function LanguageBar({ language }: LanguageBarProps) {
  return (
    <ScrollArea className="border-b py-2">
      <ul className="flex space-x-4 py-1">
        <li>
          <Link title="For You" href="?">
            <Badge
              className={cn(
                "bg-primary p-2 hover:shadow lg:px-4",
                language && "bg-primary-foreground text-primary hover:bg-muted"
              )}>
              For&nbsp;you
            </Badge>
          </Link>
        </li>

        {SUPPORTED_LANGUAGES.map((lang) => (
          <li key={lang}>
            <Link title={lang} href={`?lang=${lang.toLowerCase()}`}>
              <Badge
                className={cn(
                  "bg-primary-foreground text-primary hover:bg-muted p-2 hover:shadow-sm lg:px-4",
                  language === lang.toLowerCase() &&
                    "!bg-primary text-primary-foreground"
                )}>
                {lang}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>

      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}
