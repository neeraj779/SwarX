import { cn } from '@/lib/utils';
import { Github, Linkedin } from 'lucide-react';

type FooterProps = React.HTMLAttributes<HTMLElement>;

export default function SiteCredits({ className, ...props }: FooterProps) {
  return (
    <footer className={cn('py-2', className)} {...props}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-1">
            <p className="text-sm text-muted-foreground">
              Made with{' '}
              <span
                className="inline-block animate-pulse text-red-500 hover:scale-110 transition-transform"
                aria-label="love"
              >
                ❤️
              </span>{' '}
              by Neeraj
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-2">
            <a
              href="https://github.com/neeraj779"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Github"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/neeraj779"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
