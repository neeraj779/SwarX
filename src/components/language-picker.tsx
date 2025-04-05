"use client";

import { useState } from "react";

import { SUPPORTED_LANGUAGES } from "@/constants/language.constants";
import { Check, ChevronDown, Globe, Save } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LanguagePickerProps {
  initialLanguages: string[];
}

export function LanguagePicker({ initialLanguages }: LanguagePickerProps) {
  const [selectedLanguages, setSelectedLanguages] =
    useState<string[]>(initialLanguages);
  const [tempSelected, setTempSelected] = useState<string[]>(initialLanguages);
  const [open, setOpen] = useState(false);

  const languageCount = selectedLanguages.length;

  const handleUpdateLanguages = () => {
    setSelectedLanguages(tempSelected);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Globe className="text-primary h-4 w-4" />
          <span className="hidden font-medium sm:inline">
            {languageCount ? `${languageCount} Selected` : "Languages"}
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
              const isSelected = tempSelected.includes(langValue);

              return (
                <button
                  key={lang}
                  onClick={() => {
                    setTempSelected((prev) =>
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
