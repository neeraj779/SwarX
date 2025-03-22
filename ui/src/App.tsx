import { RootLayout } from '@/layout/root-layout';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './components/theme-provider';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './components/fallback';
import AppRoutes from '@/routes/app.routes';
import { QueryProvider } from './lib/providers/query-provider';

function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <QueryProvider>
            <RootLayout>
              <AppRoutes />
            </RootLayout>
          </QueryProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
