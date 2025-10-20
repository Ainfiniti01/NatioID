// apps/web/src/utils/routeImports.ts
import { ComponentType } from 'react';

type LazyComponentImport = () => Promise<{ default: ComponentType<any> }>;

export const routeImportMap: Record<string, LazyComponentImport> = {
  'RedirectToAdminLogin.jsx': () => import('../app/RedirectToAdminLogin.jsx'),
  'admin/applications/page.jsx': () => import('../app/admin/applications/page.jsx'),
  'admin/change-password/page.jsx': () => import('../app/admin/change-password/page.jsx'),
  'admin/chat/page.jsx': () => import('../app/admin/chat/page.jsx'),
  'admin/complaints/page.jsx': () => import('../app/admin/complaints/page.jsx'),
  'admin/login/page.jsx': () => import('../app/admin/login/page.jsx'),
  'admin/users/page.jsx': () => import('../app/admin/users/page.jsx'),
  'admin/voting/page.jsx': () => import('../app/admin/voting/page.jsx'),
  'admin/voting/MonitorLiveResultPage.jsx': () => import('../app/admin/voting/MonitorLiveResultPage.jsx'),
  'admin/voting/ManageCandidatesPage.jsx': () => import('../app/admin/voting/ManageCandidatesPage.jsx'),
  'admin/voting/CandidateDetailsPage.jsx': () => import('../app/admin/voting/CandidateDetailsPage.jsx'),
  'admin/voting/EditElectionPage.jsx': () => import('../app/admin/voting/EditElectionPage.jsx'),
  'admin/voting/New-Election.jsx': () => import('../app/admin/voting/New-Election.jsx'),
  'applications/page.jsx': () => import('../app/applications/page.jsx'),
  'benefits/page.jsx': () => import('../app/benefits/page.jsx'),
  'benefits/[id]/applicants/page.jsx': () => import('../app/benefits/[id]/applicants/page.jsx'),
  'complaints/page.jsx': () => import('../app/complaints/page.jsx'),
  'dashboard/page.jsx': () => import('../app/dashboard/page.jsx'),
  'logs/page.jsx': () => import('../app/logs/page.jsx'),
  'reports/page.jsx': () => import('../app/reports/page.jsx'),
  'settings/page.jsx': () => import('../app/settings/page.jsx'),
  'super-admin/activity-logs/page.jsx': () => import('../app/super-admin/activity-logs/page.jsx'),
  'super-admin/admin-accounts/page.jsx': () => import('../app/super-admin/admin-accounts/page.jsx'),
  'super-admin/admin-detail/[id]/page.jsx': () => import('../app/super-admin/admin-detail/[id]/page.jsx'),
  'super-admin/audit-reports/page.jsx': () => import('../app/super-admin/audit-reports/page.jsx'),
  'super-admin/dashboard/page.jsx': () => import('../app/super-admin/dashboard/page.jsx'),
  'super-admin/login/page.jsx': () => import('../app/super-admin/login/page.jsx'),
  'super-admin/system-settings/page.jsx': () => import('../app/super-admin/system-settings/page.jsx'),
  '__create/not-found.tsx': () => import('../app/__create/not-found.tsx'),
};
