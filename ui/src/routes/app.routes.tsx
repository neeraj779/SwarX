import { useSession } from '@/lib/auth-client';
import DashboardPage from '@/pages/dashboard';
import AuthPage from '@/pages/auth';
import { Navigate, Route, Routes } from 'react-router';
import { match } from 'ts-pattern';
import { AppLayout } from '@/layout/app-layout';
import { AuthLayout } from '@/layout/auth-layout';

// Temporary components until real ones are created
const LoadingAnimation = () => <div>Loading...</div>;
const NotFound = () => <div>404 Not Found</div>;

type RouteConfig = {
  path: string;
  element?: React.ReactNode;
  redirect?: string;
  protected?: boolean;
  requiredRole?: string[];
  children?: RouteConfig[];
};

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <AppLayout />,
    protected: true,
    children: [
      {
        path: '',
        element: <DashboardPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <AuthPage mode="login" />
      },
      {
        path: 'signup',
        element: <AuthPage mode="signup" />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const ProtectedRoute = ({
  children,
  requiredRole
}: {
  children: React.ReactNode;
  requiredRole?: string[];
}) => {
  const { data: session, isPending } = useSession();
  const userRole = (session?.user as { role?: string })?.role;
  if (isPending) return <LoadingAnimation />;

  if (isUserRoleInvalid(requiredRole, userRole)) {
    return <Navigate to="/" replace />;
  }

  return session ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

const isUserRoleInvalid = (requiredRole?: string[], userRole?: string) => {
  return requiredRole && userRole && !requiredRole.includes(userRole);
};

const generateRoutes = (routes: RouteConfig[]): React.ReactNode => {
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={match(route)
        .with({ protected: true }, () => (
          <ProtectedRoute requiredRole={route.requiredRole}>{route.element}</ProtectedRoute>
        ))
        .with({ redirect: route.redirect }, () => <Navigate to={route.redirect!} />)
        .otherwise(() => route.element)}
    >
      {route.children && generateRoutes(route.children)}
    </Route>
  ));
};

export default function AppRoutes() {
  return <Routes>{generateRoutes(routes)}</Routes>;
}
