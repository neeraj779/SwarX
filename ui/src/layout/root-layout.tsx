import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/lib/providers/query-provider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
