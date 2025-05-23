import { LanguagePicker } from "./language-picker";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export function SiteHeader() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Home</h1>
        <div className="ml-auto flex items-center gap-2">
          <LanguagePicker initialLanguages={[]} />
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
}
