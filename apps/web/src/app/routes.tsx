import { type RouteObject, redirect } from 'react-router-dom'; // Import redirect
import LazyRouteElement from '../components/LazyRouteElement'; // Import the new component

// Define an intermediate type to hold both the RouteConfigEntry and its componentPath
type ExtendedRouteConfig = {
  path: string;
  index?: boolean;
  componentPath: string;
};

// Manually define the routes based on the previous App.tsx and file structure
const generatedExtendedRoutes: ExtendedRouteConfig[] = [
  // Redirect from root to /admin/login
  { path: '/', componentPath: '../components/RedirectToAdminLogin.jsx' }, // Use the new path for the redirect component
  { path: '/admin/applications', componentPath: './admin/applications/page.jsx' },
  { path: '/admin/change-password', componentPath: './admin/change-password/page.jsx' },
  { path: '/admin/chat', componentPath: './admin/chat/page.jsx' },
  { path: '/admin/complaints', componentPath: './admin/complaints/page.jsx' },
  { path: '/admin/login', componentPath: './admin/login/page.jsx' },
  { path: '/admin/users', componentPath: './admin/users/page.jsx' },
  { path: '/admin/voting', componentPath: './admin/voting/page.jsx' },
  { path: '/applications', componentPath: './applications/page.jsx' },
  { path: '/benefits', componentPath: './benefits/page.jsx' },
  { path: '/complaints', componentPath: './complaints/page.jsx' },
  { path: '/dashboard', componentPath: './dashboard/page.jsx' },
  { path: '/logs', componentPath: './logs/page.jsx' },
  { path: '/reports', componentPath: './reports/page.jsx' },
  { path: '/settings', componentPath: './settings/page.jsx' }, // Assuming a settings page exists
  { path: '/super-admin/activity-logs', componentPath: './super-admin/activity-logs/page.jsx' },
  { path: '/super-admin/admin-accounts', componentPath: './super-admin/admin-accounts/page.jsx' },
  { path: '/super-admin/admin-detail/:id', componentPath: './super-admin/admin-detail/[id]/page.jsx' },
  { path: '/super-admin/audit-reports', componentPath: './super-admin/audit-reports/page.jsx' }, // Assuming this exists
  { path: '/super-admin/dashboard', componentPath: './super-admin/dashboard/page.jsx' },
  { path: '/super-admin/login', componentPath: './super-admin/login/page.jsx' },
  { path: '/super-admin/system-settings', componentPath: './super-admin/system-settings/page.jsx' },
  { path: '*', componentPath: './__create/not-found.tsx' }, // Catch-all route
];

// Convert generated routes to RouteObject[]
const routes: RouteObject[] = generatedExtendedRoutes.map((extendedRoute) => {
  if (extendedRoute.path === '/') {
    return {
      path: '/',
      element: <LazyRouteElement componentPath={extendedRoute.componentPath} />,
      file: extendedRoute.componentPath, // Provide a dummy file path for the redirect route
    };
  }
  return {
    path: extendedRoute.path,
    index: extendedRoute.index,
    element: <LazyRouteElement componentPath={extendedRoute.componentPath} />,
    file: extendedRoute.componentPath,
  };
});

export default routes;
