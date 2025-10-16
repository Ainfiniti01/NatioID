// apps/web/src/utils/routeImports.ts
import { ComponentType } from 'react';

type LazyComponentImport = () => Promise<{ default: ComponentType<any> }>;

export const routeImportMap: Record<string, LazyComponentImport> = {
  '../app/RedirectToAdminLogin.jsx': () => import('../app/RedirectToAdminLogin.jsx'),
  '../app/admin/applications/page.jsx': () => import('../app/admin/applications/page.jsx'),
  '../app/admin/change-password/page.jsx': () => import('../app/admin/change-password/page.jsx'),
  '../app/admin/chat/page.jsx': () => import('../app/admin/chat/page.jsx'),
  '../app/admin/complaints/page.jsx': () => import('../app/admin/complaints/page.jsx'),
  '../app/admin/login/page.jsx': () => import('../app/admin/login/page.jsx'),
  '../app/admin/users/page.jsx': () => import('../app/admin/users/page.jsx'),
  '../app/admin/voting/page.jsx': () => import('../app/admin/voting/page.jsx'),
  '../app/applications/page.jsx': () => import('../app/applications/page.jsx'),
  '../app/benefits/page.jsx': () => import('../app/benefits/page.jsx'),
  '../app/complaints/page.jsx': () => import('../app/complaints/page.jsx'),
  '../app/dashboard/page.jsx': () => import('../app/dashboard/page.jsx'),
  '../app/logs/page.jsx': () => import('../app/logs/page.jsx'),
  '../app/reports/page.jsx': () => import('../app/reports/page.jsx'),
  '../app/settings/page.jsx': () => import('../app/settings/page.jsx'),
  '../app/super-admin/activity-logs/page.jsx': () => import('../app/super-admin/activity-logs/page.jsx'),
  '../app/super-admin/admin-accounts/page.jsx': () => import('../app/super-admin/admin-accounts/page.jsx'),
  '../app/super-admin/admin-detail/[id]/page.jsx': () => import('../app/super-admin/admin-detail/[id]/page.jsx'),
  '../app/super-admin/audit-reports/page.jsx': () => import('../app/super-admin/audit-reports/page.jsx'),
  '../app/super-admin/dashboard/page.jsx': () => import('../app/super-admin/dashboard/page.jsx'),
  '../app/super-admin/login/page.jsx': () => import('../app/super-admin/login/page.jsx'),
  '../app/super-admin/system-settings/page.jsx': () => import('../app/super-admin/system-settings/page.jsx'),
  '../app/__create/not-found.tsx': () => import('../app/__create/not-found.tsx'),
};
