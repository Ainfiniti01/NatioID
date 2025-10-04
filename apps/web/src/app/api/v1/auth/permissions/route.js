// Role-Based Access Control (RBAC) Permissions Endpoint
import sql from '@/app/api/utils/sql';

// Canonical permissions map for all roles
const ROLE_PERMISSIONS = {
  SuperAdmin: [
    // Admin Management
    'admin.create', 'admin.read', 'admin.update', 'admin.delete', 'admin.suspend',
    // System Settings
    'system.configure', 'system.backup', 'system.audit',
    // Global Access
    'users.read', 'users.update', 'users.delete',
    'applications.read', 'applications.approve', 'applications.reject', 'applications.delete',
    'complaints.read', 'complaints.resolve', 'complaints.delete',
    'elections.create', 'elections.read', 'elections.update', 'elections.delete', 'elections.publish',
    'news.create', 'news.read', 'news.update', 'news.delete', 'news.publish',
    'reports.read', 'reports.generate', 'reports.export',
    // Audit & Logs
    'logs.read', 'logs.export',
    'activity.read', 'activity.export'
  ],
  Admin: [
    // User Management
    'users.read', 'users.update',
    // Applications
    'applications.read', 'applications.approve', 'applications.reject',
    // Complaints
    'complaints.read', 'complaints.resolve',
    // Elections (if authorized)
    'elections.read', 'elections.update', 'elections.publish',
    // News & Benefits
    'news.create', 'news.read', 'news.update', 'news.publish',
    // Reports (limited)
    'reports.read', 'reports.generate'
  ],
  Reviewer: [
    // Read and recommend only
    'users.read',
    'applications.read', 'applications.review', 'applications.comment',
    'complaints.read', 'complaints.comment',
    'elections.read',
    'news.read',
    'reports.read'
  ],
  Viewer: [
    // Read-only access
    'users.read',
    'applications.read',
    'complaints.read',
    'elections.read',
    'news.read',
    'reports.read',
    'activity.read'
  ]
};

// Department-specific permissions (additional to role permissions)
const DEPARTMENT_PERMISSIONS = {
  'ID Management': ['applications.priority', 'documents.verify'],
  'Complaints': ['complaints.escalate', 'complaints.priority'],
  'Elections': ['elections.create', 'elections.manage', 'voting.monitor'],
  'News & Benefits': ['news.featured', 'benefits.approve'],
  'System Admin': ['system.maintain', 'backup.create']
};

export async function GET(request) {
  try {
    // Extract admin ID from JWT token (dummy implementation)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Missing or invalid authorization token' }
      }, { status: 401 });
    }

    // Dummy token parsing - in real implementation, verify JWT
    const token = authHeader.substring(7);
    if (token === 'dummy-super-admin-token') {
      const adminData = {
        id: 'superadmin-001',
        name: 'Super Admin',
        email: 'superadmin@natioid.gov.ng',
        role: 'SuperAdmin',
        department: 'System Admin',
        status: 'Active'
      };

      const permissions = [
        ...ROLE_PERMISSIONS.SuperAdmin,
        ...(DEPARTMENT_PERMISSIONS[adminData.department] || [])
      ];

      return Response.json({
        success: true,
        data: {
          admin: adminData,
          permissions: [...new Set(permissions)], // Remove duplicates
          rolePermissions: ROLE_PERMISSIONS[adminData.role],
          departmentPermissions: DEPARTMENT_PERMISSIONS[adminData.department] || []
        }
      });
    }

    // Real implementation would query database
    /*
    const adminQuery = await sql`
      SELECT a.*, d.name as department_name 
      FROM admins a 
      LEFT JOIN departments d ON a.department_id = d.id 
      WHERE a.id = ${adminId} AND a.status = 'Active'
    `;
    
    if (adminQuery.length === 0) {
      return Response.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Admin not found or inactive' }
      }, { status: 404 });
    }

    const admin = adminQuery[0];
    */

    // Dummy admin data for other roles
    const dummyAdmins = {
      'dummy-admin-token': {
        id: 'admin-001',
        name: 'John Admin',
        email: 'john.admin@natioid.gov.ng',
        role: 'Admin',
        department: 'ID Management',
        status: 'Active'
      },
      'dummy-reviewer-token': {
        id: 'reviewer-001',
        name: 'Sarah Reviewer',
        email: 'sarah.reviewer@natioid.gov.ng',
        role: 'Reviewer',
        department: 'Applications',
        status: 'Active'
      },
      'dummy-viewer-token': {
        id: 'viewer-001',
        name: 'Mike Viewer',
        email: 'mike.viewer@natioid.gov.ng',
        role: 'Viewer',
        department: 'Reports',
        status: 'Active'
      }
    };

    const adminData = dummyAdmins[token];
    if (!adminData) {
      return Response.json({
        success: false,
        error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }
      }, { status: 401 });
    }

    const permissions = [
      ...(ROLE_PERMISSIONS[adminData.role] || []),
      ...(DEPARTMENT_PERMISSIONS[adminData.department] || [])
    ];

    // Log permission fetch for audit
    await logActivity({
      adminId: adminData.id,
      action: 'FETCH_PERMISSIONS',
      details: { role: adminData.role, department: adminData.department },
      ipAddress: getClientIP(request)
    });

    return Response.json({
      success: true,
      data: {
        admin: adminData,
        permissions: [...new Set(permissions)],
        rolePermissions: ROLE_PERMISSIONS[adminData.role] || [],
        departmentPermissions: DEPARTMENT_PERMISSIONS[adminData.department] || []
      }
    });

  } catch (error) {
    console.error('Error fetching permissions:', error);
    return Response.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch permissions' }
    }, { status: 500 });
  }
}

// Utility function to log activities
async function logActivity({ adminId, action, details, ipAddress }) {
  try {
    // Real implementation:
    /*
    await sql`
      INSERT INTO system_logs (user_id, action, entity_type, entity_id, details, ip_address, created_at)
      VALUES (${adminId}, ${action}, 'permission', null, ${JSON.stringify(details)}, ${ipAddress}, NOW())
    `;
    */
    console.log('Activity logged:', { adminId, action, details, ipAddress });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

// Utility function to get client IP
function getClientIP(request) {
  // Try multiple headers in order of preference
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  const remoteAddr = request.headers.get('remote-addr');
  if (remoteAddr) {
    return remoteAddr;
  }
  
  return 'unknown';
}

// Export permission checking utility
export function hasPermission(userPermissions, requiredPermission) {
  return userPermissions.includes(requiredPermission);
}

// Export role hierarchy checking
export function hasRoleOrHigher(userRole, requiredRole) {
  const roleHierarchy = ['Viewer', 'Reviewer', 'Admin', 'SuperAdmin'];
  const userLevel = roleHierarchy.indexOf(userRole);
  const requiredLevel = roleHierarchy.indexOf(requiredRole);
  return userLevel >= requiredLevel;
}