// Application Status Update API with RBAC enforcement
import sql from '@/app/api/utils/sql';

// Middleware to check permissions
async function checkPermissions(request, requiredPermission) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: { code: 'UNAUTHORIZED', message: 'Missing authorization token' }, status: 401 };
  }

  const token = authHeader.substring(7);
  
  // Dummy token validation
  const dummyAdmins = {
    'dummy-super-admin-token': { 
      id: 'superadmin-001', 
      role: 'SuperAdmin',
      permissions: ['applications.read', 'applications.approve', 'applications.reject', 'applications.delete']
    },
    'dummy-admin-token': { 
      id: 'admin-001', 
      role: 'Admin',
      permissions: ['applications.read', 'applications.approve', 'applications.reject']
    },
    'dummy-reviewer-token': { 
      id: 'reviewer-001', 
      role: 'Reviewer',
      permissions: ['applications.read', 'applications.review', 'applications.comment']
    },
    'dummy-viewer-token': { 
      id: 'viewer-001', 
      role: 'Viewer',
      permissions: ['applications.read']
    }
  };

  const admin = dummyAdmins[token];
  if (!admin) {
    return { error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' }, status: 401 };
  }

  if (!admin.permissions.includes(requiredPermission)) {
    return { 
      error: { 
        code: 'FORBIDDEN', 
        message: `Insufficient permissions. Required: ${requiredPermission}` 
      }, 
      status: 403 
    };
  }

  return { admin };
}

// PATCH /api/v1/applications/[id]/status - Update application status
export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const { status, admin_notes } = body;
    const applicationId = params.id;

    // Check permissions based on status change
    let requiredPermission;
    switch (status) {
      case 'approved':
        requiredPermission = 'applications.approve';
        break;
      case 'rejected':
        requiredPermission = 'applications.reject';
        break;
      case 'under_review':
        requiredPermission = 'applications.review';
        break;
      default:
        return Response.json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Invalid status value' }
        }, { status: 400 });
    }

    const permCheck = await checkPermissions(request, requiredPermission);
    if (permCheck.error) {
      return Response.json({ success: false, error: permCheck.error }, { status: permCheck.status });
    }

    const { admin } = permCheck;

    // Validate status transition
    const validTransitions = {
      'pending': ['approved', 'rejected', 'under_review'],
      'under_review': ['approved', 'rejected', 'pending'],
      'approved': [], // Final state
      'rejected': [] // Final state
    };

    // In real implementation, get current application from database:
    /*
    const currentApp = await sql`
      SELECT * FROM applications WHERE id = ${applicationId}
    `;
    
    if (currentApp.length === 0) {
      return Response.json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Application not found' }
      }, { status: 404 });
    }

    const currentStatus = currentApp[0].status;
    if (!validTransitions[currentStatus].includes(status)) {
      return Response.json({
        success: false,
        error: { 
          code: 'INVALID_TRANSITION', 
          message: `Cannot transition from ${currentStatus} to ${status}` 
        }
      }, { status: 400 });
    }
    */

    // Dummy validation for demo
    const currentStatus = 'pending'; // Assume current status
    if (!validTransitions[currentStatus]?.includes(status)) {
      return Response.json({
        success: false,
        error: { 
          code: 'INVALID_TRANSITION', 
          message: `Cannot transition from ${currentStatus} to ${status}` 
        }
      }, { status: 400 });
    }

    // Update application status with idempotency key support
    const idempotencyKey = request.headers.get('X-Idempotency-Key');
    if (idempotencyKey) {
      // Check if this operation was already performed
      // In real implementation, check idempotency table
    }

    // Real implementation would update database:
    /*
    const updatedApp = await sql`
      UPDATE applications 
      SET status = ${status}, 
          admin_notes = ${admin_notes || null},
          updated_at = NOW()
      WHERE id = ${applicationId}
      RETURNING *
    `;
    */

    // Dummy response
    const updatedApplication = {
      id: parseInt(applicationId),
      application_id: `APP-2025-${applicationId.padStart(6, '0')}`,
      user_id: 101,
      application_type: 'NATIONAL_ID',
      status: status,
      submitted_data: {
        fullName: 'John Citizen',
        dateOfBirth: '1990-01-15',
        address: '123 Lagos Street, Victoria Island',
        phone: '+234 801 234 5678',
        email: 'john.citizen@email.com'
      },
      admin_notes: admin_notes || null,
      created_at: '2025-01-19T08:30:00Z',
      updated_at: new Date().toISOString(),
      updated_by: admin.id
    };

    // Log status change for audit
    await logActivity({
      adminId: admin.id,
      action: 'UPDATE_APPLICATION_STATUS',
      entityType: 'application',
      entityId: applicationId,
      details: { 
        previousStatus: currentStatus,
        newStatus: status,
        adminNotes: admin_notes,
        idempotencyKey
      },
      ipAddress: getClientIP(request)
    });

    // Send notification to citizen (in real implementation)
    await sendStatusUpdateNotification(updatedApplication);

    return Response.json({
      success: true,
      data: { application: updatedApplication }
    });

  } catch (error) {
    console.error('Error updating application status:', error);
    return Response.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to update application status' }
    }, { status: 500 });
  }
}

// GET /api/v1/applications/[id]/status - Get application status history
export async function GET(request, { params }) {
  try {
    const permCheck = await checkPermissions(request, 'applications.read');
    if (permCheck.error) {
      return Response.json({ success: false, error: permCheck.error }, { status: permCheck.status });
    }

    const { admin } = permCheck;
    const applicationId = params.id;

    // Real implementation would query status history:
    /*
    const statusHistory = await sql`
      SELECT 
        sl.action,
        sl.details,
        sl.created_at,
        sl.ip_address,
        a.name as admin_name,
        a.role as admin_role
      FROM system_logs sl
      LEFT JOIN admins a ON sl.user_id = a.id
      WHERE sl.entity_type = 'application' 
        AND sl.entity_id = ${applicationId}
        AND sl.action = 'UPDATE_APPLICATION_STATUS'
      ORDER BY sl.created_at DESC
    `;
    */

    // Dummy status history
    const statusHistory = [
      {
        action: 'UPDATE_APPLICATION_STATUS',
        details: {
          previousStatus: 'pending',
          newStatus: 'under_review',
          adminNotes: 'Additional documentation required'
        },
        created_at: '2025-01-19T09:15:00Z',
        ip_address: '192.168.1.105',
        admin_name: 'Sarah Manager',
        admin_role: 'Admin'
      },
      {
        action: 'CREATE_APPLICATION',
        details: {
          applicationType: 'NATIONAL_ID',
          initialStatus: 'pending'
        },
        created_at: '2025-01-19T08:30:00Z',
        ip_address: '203.0.113.1',
        admin_name: null,
        admin_role: null
      }
    ];

    return Response.json({
      success: true,
      data: { 
        applicationId,
        statusHistory 
      }
    });

  } catch (error) {
    console.error('Error fetching application status history:', error);
    return Response.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch status history' }
    }, { status: 500 });
  }
}

// Utility functions
async function logActivity({ adminId, action, entityType, entityId, details, ipAddress }) {
  try {
    // Real implementation:
    /*
    await sql`
      INSERT INTO system_logs (user_id, action, entity_type, entity_id, details, ip_address, created_at)
      VALUES (${adminId}, ${action}, ${entityType}, ${entityId}, ${JSON.stringify(details)}, ${ipAddress}, NOW())
    `;
    */
    console.log('Activity logged:', { adminId, action, entityType, entityId, details, ipAddress });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

async function sendStatusUpdateNotification(application) {
  try {
    // Real implementation would send email/SMS/push notification
    /*
    await notificationService.send({
      userId: application.user_id,
      type: 'application_status_update',
      title: `Application ${application.application_id} Status Update`,
      message: `Your ${application.application_type} application status has been updated to: ${application.status}`,
      data: {
        applicationId: application.application_id,
        status: application.status,
        adminNotes: application.admin_notes
      }
    });
    */
    console.log('Notification sent for application:', application.application_id);
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}

function getClientIP(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}
