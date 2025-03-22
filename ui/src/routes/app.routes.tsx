import DashboardPage from '@/pages/dashboard';
import { Navigate, Route, Routes } from 'react-router';
import { match } from 'ts-pattern';

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
    element: <DashboardPage />
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
  // TODO: Replace with actual session management
  const session = { user: { role: 'user' } };
  const isPending = false;

  if (isPending) return <LoadingAnimation />;

  const userRole = session?.user?.role;

  if (isUserRoleInvalid(requiredRole, userRole)) {
    return <Navigate to="/" replace />;
  }

  return session ? <>{children}</> : <Navigate to="/auth" replace />;
};

const isUserRoleInvalid = (requiredRole?: string[], userRole?: string) => {
  if (!requiredRole) return false;
  return !requiredRole.includes(userRole || '');
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
