import type { SliderCardProps } from "./slider-card";
import { SliderCard } from "./slider-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

type SliderListItem = { id: string } & SliderCardProps;

interface SliderListProps {
  title: string;
  subtitle?: string;
  items: SliderListItem[];
}

export function SliderList({ title, subtitle, items }: SliderListProps) {
  return (
    <section className="group/slider space-y-3 py-2">
      <header className="space-y-1.5">
        <h2 className="font-heading from-foreground to-foreground/80 group-hover/slider:from-primary group-hover/slider:to-primary/80 dark:group-hover/slider:from-primary dark:group-hover/slider:to-primary/70 bg-gradient-to-br bg-clip-text pl-2 text-xl font-bold text-transparent drop-shadow-md transition-all duration-300 ease-out sm:text-2xl md:text-3xl lg:pl-0 dark:from-neutral-200 dark:to-neutral-600">
          {title}
        </h2>

        {subtitle && (
          <p className="text-muted-foreground/80 group-hover/slider:text-muted-foreground pl-2 font-medium transition-colors duration-300 lg:pl-1">
            {subtitle}
          </p>
        )}
      </header>

      <ScrollArea className="-mx-2 px-2">
        <ol className="flex gap-4 pt-1 pb-4">
          {items.map(({ id, ...props }) => (
            <li
              key={id}
              className="transition-transform duration-300 hover:-translate-y-1">
              <SliderCard {...props} />
            </li>
          ))}
        </ol>
        <ScrollBar
          orientation="horizontal"
          className="hover:bg-primary/20 transition-colors duration-300"
        />
      </ScrollArea>
    </section>
  );
}
