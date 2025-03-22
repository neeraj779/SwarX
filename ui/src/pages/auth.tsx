import { GalleryVerticalEnd } from 'lucide-react';
import { AuthForm } from '@/components/auth-form';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

export default function AuthPage({ mode }: AuthPageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-0 rounded-3xl" />
        <div className="flex flex-col gap-8 relative">
          <a href="#" className="flex items-center gap-3 self-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              SwarX
            </span>
          </a>
          <AuthForm mode={mode} />
        </div>
      </div>
    </div>
  );
}
