"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { SUPPORTED_LANGUAGES } from "@/constants/language.constants";
import { getCookie, setCookie } from "cookies-next";
import { Check, ChevronDown, Globe, Save } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

interface LanguagePickerProps {
  initialLanguages: string[];
}

export function LanguagePicker({ initialLanguages }: LanguagePickerProps) {
  const router = useRouter();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookieLanguages = getCookie("language")?.toString();
    if (cookieLanguages) {
      setSelectedLanguages(cookieLanguages.split(","));
    } else {
      setSelectedLanguages(initialLanguages);
    }
    setIsLoading(false);
  }, [initialLanguages]);

  const languageCount = selectedLanguages.length;

  const handleUpdateLanguages = () => {
    setOpen(false);
    setCookie("language", selectedLanguages.join(","), {
      path: "/",
    });

    toast.success("Language Preferences Updated");

    router.refresh();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="min-w-[120px]">
          <Globe className="text-primary h-4 w-4" />
          <span className="font-medium">
            {isLoading ? (
              <Skeleton className="h-4 w-20" />
            ) : languageCount ? (
              `${languageCount} Selected`
            ) : (
              "Languages"
            )}
          </span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[280px] rounded-xl border-[1.5px] p-4 shadow-lg">
        <div className="flex flex-col gap-3">
          <h3 className="text-foreground/90 border-b pb-1 text-sm font-semibold">
            Select Languages
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const langValue = lang.toLowerCase();
              const isSelected = selectedLanguages.includes(langValue);

              return (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguages((prev) =>
                      prev.includes(langValue)
                        ? prev.filter((l) => l !== langValue)
                        : [...prev, langValue]
                    );
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    "hover:bg-accent/70 hover:text-accent-foreground focus-visible:ring-ring focus:outline-none focus-visible:ring-2",
                    isSelected
                      ? "bg-primary/10 text-primary border-primary/30 border"
                      : "bg-background border-input border"
                  )}>
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30"
                    )}>
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  <span>{lang}</span>
                </button>
              );
            })}
          </div>
          <Button onClick={handleUpdateLanguages} className="mt-2 w-full gap-2">
            <Save className="h-4 w-4" />
            Update
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
