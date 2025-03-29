import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './components/fallback';
import AppRoutes from '@/routes/app.routes';
import { RootLayout } from './layout/root-layout';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <BrowserRouter>
        <RootLayout>
          <AppRoutes />
        </RootLayout>
      </BrowserRouter>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
