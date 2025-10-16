// Role-Based Access Control (RBAC) Frontend Utilities
import { useState, useEffect, createContext, useContext } from 'react';

// RBAC Context for managing permissions across the app
const RBACContext = createContext(null);

// RBAC Provider Component
export function RBACProvider({ children }) {
  const [permissions, setPermissions] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch permissions on mount and when token changes
  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // DUMMY ONLY – REMOVE IN PRODUCTION
      const dummyPermissions = [
        "admin.create",
        "admin.read",
        "admin.update",
        "admin.delete",
        "admin.suspend",
        "system.configure",
        "system.backup",
        "system.audit",
        "users.read",
        "users.update",
        "users.delete",
        "applications.read",
        "applications.approve",
        "applications.reject",
        "applications.delete",
        "applications.review",
        "applications.comment",
        "complaints.read",
        "complaints.resolve",
        "complaints.delete",
        "complaints.comment",
        "elections.create",
        "elections.read",
        "elections.update",
        "elections.delete",
        "elections.publish",
        "news.create",
        "news.read",
        "news.update",
        "news.delete",
        "news.publish",
        "reports.read",
        "reports.generate",
        "reports.export",
        "logs.read",
        "logs.export",
        "activity.read",
        "activity.export",
      ];
      const dummyAdmin = {
        id: "1",
        name: "Dummy Admin",
        email: "admin@example.com",
        role: "SuperAdmin",
      };

      setPermissions(dummyPermissions);
      setAdmin(dummyAdmin);
    } catch (err) {
      console.error("Error setting dummy data:", err);
      setError("Something went wrong. Please contact support");
      setPermissions([]);
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh permissions (useful when role changes)
  const refreshPermissions = () => {
    fetchPermissions();
  };

  // Clear permissions (logout)
  const clearPermissions = () => {
    setPermissions([]);
    setAdmin(null);
    localStorage.removeItem('admin_token');
  };

  const value = {
    permissions,
    admin,
    isLoading,
    error,
    refreshPermissions,
    clearPermissions,
    // Utility functions
    can: (permission) => permissions.includes(permission),
    cannot: (permission) => !permissions.includes(permission),
    hasRole: (role) => admin?.role === role,
    hasRoleOrHigher: (role) => {
      const roleHierarchy = ['Viewer', 'Reviewer', 'Admin', 'SuperAdmin'];
      const userLevel = roleHierarchy.indexOf(admin?.role);
      const requiredLevel = roleHierarchy.indexOf(role);
      return userLevel >= requiredLevel;
    }
  };

  return (
    <RBACContext.Provider value={value}>
      {children}
    </RBACContext.Provider>
  );
}

// Custom hook to access RBAC context
export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
}

// Permission checking hook
export function usePermissions() {
  const { permissions, can, cannot, hasRole, hasRoleOrHigher } = useRBAC();
  
  return {
    permissions,
    can,
    cannot,
    hasRole,
    hasRoleOrHigher
  };
}

// Higher-order component for permission-based rendering
export function withPermission(Component, requiredPermission, fallback = null) {
  return function PermissionWrapper(props) {
    const { can } = useRBAC();
    
    if (can(requiredPermission)) {
      return <Component {...props} />;
    }
    
    return fallback;
  };
}

// Component for conditional rendering based on permissions
export function PermissionGuard({ permission, role, fallback = null, children }) {
  const { can, hasRole, hasRoleOrHigher } = useRBAC();
  
  // Check permission if provided
  if (permission && !can(permission)) {
    return fallback;
  }
  
  // Check role if provided
  if (role && !hasRoleOrHigher(role)) {
    return fallback;
  }
  
  return children;
}

// Component for showing access denied message
export function AccessDenied({ message, requestAccess = false }) {
  const { admin } = useRBAC();
  
  const handleRequestAccess = () => {
    // Log access request for SuperAdmin review
    console.log('Access request logged for:', admin?.email);
    alert('Access request has been sent to SuperAdmin for review.');
  };
  
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.312 17.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
      <p className="text-gray-600 mb-4">
        {message || 'You do not have permission to access this feature.'}
      </p>
      {requestAccess && (
        <button
          onClick={handleRequestAccess}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Request Access
        </button>
      )}
    </div>
  );
}

// Button component with permission checking
export function PermissionButton({ 
  permission, 
  role, 
  onClick, 
  children, 
  className = '', 
  disabledMessage = 'You do not have permission to perform this action',
  showTooltip = true,
  ...props 
}) {
  const { can, hasRoleOrHigher } = useRBAC();
  
  const hasPermission = permission ? can(permission) : true;
  const hasRequiredRole = role ? hasRoleOrHigher(role) : true;
  const isAllowed = hasPermission && hasRequiredRole;
  
  if (!isAllowed && !showTooltip) {
    return null; // Hide button completely
  }
  
  return (
    <div className="relative inline-block">
      <button
        onClick={isAllowed ? onClick : undefined}
        disabled={!isAllowed}
        className={`${className} ${!isAllowed ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={!isAllowed ? disabledMessage : undefined}
        {...props}
      >
        {children}
      </button>
      {!isAllowed && showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          {disabledMessage}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
}

// Menu item component with permission checking
export function PermissionMenuItem({ permission, role, href, children, onClick }) {
  const { can, hasRoleOrHigher } = useRBAC();
  
  const hasPermission = permission ? can(permission) : true;
  const hasRequiredRole = role ? hasRoleOrHigher(role) : true;
  const isAllowed = hasPermission && hasRequiredRole;
  
  if (!isAllowed) {
    return null; // Hide menu item
  }
  
  if (href) {
    return (
      <a href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        {children}
      </a>
    );
  }
  
  return (
    <button 
      onClick={onClick}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

// Utility functions for direct permission checking
export function checkPermission(permissions, permission) {
  return permissions.includes(permission);
}

export function checkRole(userRole, requiredRole) {
  const roleHierarchy = ['Viewer', 'Reviewer', 'Admin', 'SuperAdmin'];
  const userLevel = roleHierarchy.indexOf(userRole);
  const requiredLevel = roleHierarchy.indexOf(requiredRole);
  return userLevel >= requiredLevel;
}

// Permission constants for easy reference
export const PERMISSIONS = {
  // Admin Management
  ADMIN_CREATE: 'admin.create',
  ADMIN_READ: 'admin.read',
  ADMIN_UPDATE: 'admin.update',
  ADMIN_DELETE: 'admin.delete',
  ADMIN_SUSPEND: 'admin.suspend',
  
  // System
  SYSTEM_CONFIGURE: 'system.configure',
  SYSTEM_BACKUP: 'system.backup',
  SYSTEM_AUDIT: 'system.audit',
  
  // Users
  USERS_READ: 'users.read',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',
  
  // Applications
  APPLICATIONS_READ: 'applications.read',
  APPLICATIONS_APPROVE: 'applications.approve',
  APPLICATIONS_REJECT: 'applications.reject',
  APPLICATIONS_DELETE: 'applications.delete',
  APPLICATIONS_REVIEW: 'applications.review',
  APPLICATIONS_COMMENT: 'applications.comment',
  
  // Complaints
  COMPLAINTS_READ: 'complaints.read',
  COMPLAINTS_RESOLVE: 'complaints.resolve',
  COMPLAINTS_DELETE: 'complaints.delete',
  COMPLAINTS_COMMENT: 'complaints.comment',
  
  // Elections
  ELECTIONS_CREATE: 'elections.create',
  ELECTIONS_READ: 'elections.read',
  ELECTIONS_UPDATE: 'elections.update',
  ELECTIONS_DELETE: 'elections.delete',
  ELECTIONS_PUBLISH: 'elections.publish',
  
  // News
  NEWS_CREATE: 'news.create',
  NEWS_READ: 'news.read',
  NEWS_UPDATE: 'news.update',
  NEWS_DELETE: 'news.delete',
  NEWS_PUBLISH: 'news.publish',
  
  // Reports
  REPORTS_READ: 'reports.read',
  REPORTS_GENERATE: 'reports.generate',
  REPORTS_EXPORT: 'reports.export',
  
  // Logs
  LOGS_READ: 'logs.read',
  LOGS_EXPORT: 'logs.export',
  ACTIVITY_READ: 'activity.read',
  ACTIVITY_EXPORT: 'activity.export'
};

// Role constants
export const ROLES = {
  SUPER_ADMIN: 'SuperAdmin',
  ADMIN: 'Admin',
  REVIEWER: 'Reviewer',
  VIEWER: 'Viewer'
};
