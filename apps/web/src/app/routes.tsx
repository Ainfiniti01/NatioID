import { type RouteObject, redirect } from 'react-router-dom'; // Import redirect
import LazyRouteElement from '../components/LazyRouteElement'; // Import the new component
import RedirectToAdminLogin from './RedirectToAdminLogin'; // Statically import the component

// Define an intermediate type to hold both the RouteConfigEntry and its componentPath
type ExtendedRouteConfig = {
  path: string;
  index?: boolean;
  componentPath: string;
};

// Manually define the routes based on the previous App.tsx and file structure
const generatedExtendedRoutes: ExtendedRouteConfig[] = [
  // Redirect from root to /admin/login
  { path: '/', componentPath: '../app/RedirectToAdminLogin.jsx' }, // Use the new path for the redirect component
  { path: '/admin/applications', componentPath: '../app/admin/applications/page.jsx' },
  { path: '/admin/change-password', componentPath: '../app/admin/change-password/page.jsx' },
  { path: '/admin/chat', componentPath: '../app/admin/chat/page.jsx' },
  { path: '/admin/complaints', componentPath: '../app/admin/complaints/page.jsx' },
  { path: '/admin/login', componentPath: '../app/admin/login/page.jsx' },
  { path: '/admin/users', componentPath: '../app/admin/users/page.jsx' },
  { path: '/admin/voting', componentPath: '../app/admin/voting/page.jsx' },
  { path: '/applications', componentPath: '../app/applications/page.jsx' },
  { path: '/benefits', componentPath: '../app/benefits/page.jsx' },
  { path: '/complaints', componentPath: '../app/complaints/page.jsx' },
  { path: '/dashboard', componentPath: '../app/dashboard/page.jsx' },
  { path: '/logs', componentPath: '../app/logs/page.jsx' },
  { path: '/reports', componentPath: '../app/reports/page.jsx' },
  { path: '/settings', componentPath: '../app/settings/page.jsx' }, // Assuming a settings page exists
  { path: '/super-admin/activity-logs', componentPath: '../app/super-admin/activity-logs/page.jsx' },
  { path: '/super-admin/admin-accounts', componentPath: '../app/super-admin/admin-accounts/page.jsx' },
  { path: '/super-admin/admin-detail/:id', componentPath: '../app/super-admin/admin-detail/[id]/page.jsx' },
  { path: '/super-admin/audit-reports', componentPath: '../app/super-admin/audit-reports/page.jsx' }, // Assuming this exists
  { path: '/super-admin/dashboard', componentPath: '../app/super-admin/dashboard/page.jsx' },
  { path: '/super-admin/login', componentPath: '../app/super-admin/login/page.jsx' },
  { path: '/super-admin/system-settings', componentPath: '../app/super-admin/system-settings/page.jsx' },
  { path: '*', componentPath: '../app/__create/not-found.tsx' }, // Catch-all route
];

// Convert generated routes to RouteObject[]
const routes: RouteObject[] = generatedExtendedRoutes.map((extendedRoute) => {
  if (extendedRoute.path === '/') {
    return {
      path: '/',
      element: <RedirectToAdminLogin />, // Use the statically imported component directly
      file: extendedRoute.componentPath, // Add the file property
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
