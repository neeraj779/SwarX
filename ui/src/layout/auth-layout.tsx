import { ThemeModeToggle } from '@/components/theme-mode-toggle';
import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] bg-muted">
      <div className="w-full flex justify-end p-4">
        <ThemeModeToggle />
      </div>
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
