// Applications API with RBAC enforcement
import sql from '@/app/api/utils/sql';

// Middleware to check permissions
async function checkPermissions(request, requiredPermission) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: { code: 'UNAUTHORIZED', message: 'Missing authorization token' }, status: 401 };
  }

  const token = authHeader.substring(7);
  
  // In real implementation, verify JWT and extract admin data
  // For now, use dummy token validation
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

// GET /api/v1/applications - List applications with filtering
export async function GET(request) {
  try {
    const permCheck = await checkPermissions(request, 'applications.read');
    if (permCheck.error) {
      return Response.json({ success: false, error: permCheck.error }, { status: permCheck.status });
    }

    const { admin } = permCheck;
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build filters
    let filters = [];
    let values = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      filters.push(`status = $${paramCount}`);
      values.push(status);
    }

    if (type) {
      paramCount++;
      filters.push(`application_type = $${paramCount}`);
      values.push(type);
    }

    if (search) {
      paramCount++;
      filters.push(`(application_id ILIKE $${paramCount} OR submitted_data::text ILIKE $${paramCount})`);
      values.push(`%${search}%`);
    }

    // For non-SuperAdmin, only show applications they can access
    if (admin.role !== 'SuperAdmin') {
      // Additional filtering logic based on role/department would go here
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    const offset = (page - 1) * limit;

    // Real implementation would use actual SQL:
    /*
    const applications = await sql(
      `SELECT a.*, u.full_name, u.email 
       FROM applications a 
       LEFT JOIN users u ON a.user_id = u.id 
       ${whereClause}
       ORDER BY ${sortBy} ${sortOrder}
       LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`,
      [...values, limit, offset]
    );

    const totalCount = await sql(
      `SELECT COUNT(*) as count FROM applications a ${whereClause}`,
      values
    );
    */

    // Dummy data for now
    const dummyApplications = [
      {
        id: 1,
        application_id: 'APP-2025-001234',
        user_id: 101,
        application_type: 'NATIONAL_ID',
        status: 'pending',
        submitted_data: {
          fullName: 'John Citizen',
          dateOfBirth: '1990-01-15',
          address: '123 Lagos Street, Victoria Island',
          phone: '+234 801 234 5678',
          email: 'john.citizen@email.com'
        },
        admin_notes: null,
        created_at: '2025-01-19T08:30:00Z',
        updated_at: '2025-01-19T08:30:00Z',
        user: {
          full_name: 'John Citizen',
          email: 'john.citizen@email.com'
        }
      },
      {
        id: 2,
        application_id: 'APP-2025-001235',
        user_id: 102,
        application_type: 'Driver License',
        status: 'approved',
        submitted_data: {
          fullName: 'Sarah Johnson',
          dateOfBirth: '1985-05-20',
          address: '456 Abuja Road, Central Area',
          phone: '+234 802 345 6789',
          email: 'sarah.johnson@email.com'
        },
        admin_notes: 'Approved after document verification',
        created_at: '2025-01-18T14:15:00Z',
        updated_at: '2025-01-19T09:45:00Z',
        user: {
          full_name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com'
        }
      },
      {
        id: 3,
        application_id: 'APP-2025-001236',
        user_id: 103,
        application_type: 'Passport',
        status: 'under_review',
        submitted_data: {
          fullName: 'Michael Brown',
          dateOfBirth: '1992-12-03',
          address: '789 Port Harcourt Avenue',
          phone: '+234 803 456 7890',
          email: 'michael.brown@email.com'
        },
        admin_notes: 'Additional documentation required',
        created_at: '2025-01-17T11:20:00Z',
        updated_at: '2025-01-18T16:30:00Z',
        user: {
          full_name: 'Michael Brown',
          email: 'michael.brown@email.com'
        }
      }
    ];

    // Apply dummy filtering
    let filteredApplications = dummyApplications;
    
    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }
    if (type) {
      filteredApplications = filteredApplications.filter(app => app.application_type === type);
    }
    if (search) {
      filteredApplications = filteredApplications.filter(app => 
        app.application_id.toLowerCase().includes(search.toLowerCase()) ||
        app.submitted_data.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply pagination
    const totalCount = filteredApplications.length;
    const paginatedApplications = filteredApplications.slice(offset, offset + limit);

    // Log access for audit
    await logActivity({
      adminId: admin.id,
      action: 'LIST_APPLICATIONS',
      details: { 
        filters: { status, type, search },
        resultCount: paginatedApplications.length 
      },
      ipAddress: getClientIP(request)
    });

    return Response.json({
      success: true,
      data: {
        applications: paginatedApplications,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
          hasNext: page * limit < totalCount,
          hasPrev: page > 1
        },
        filters: { status, type, search, sortBy, sortOrder }
      }
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    return Response.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch applications' }
    }, { status: 500 });
  }
}

// POST /api/v1/applications - Create new application (citizen-facing)
export async function POST(request) {
  try {
    // For application creation, we'd typically validate citizen auth
    // For now, simulate basic validation
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['user_id', 'application_type', 'submitted_data'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return Response.json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: `Missing required field: ${field}` }
        }, { status: 400 });
      }
    }

    // Generate application ID
    const applicationId = `APP-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;

    // Real implementation would insert into database:
    /*
    const application = await sql`
      INSERT INTO applications (
        application_id, user_id, application_type, status, submitted_data, created_at, updated_at
      )
      VALUES (
        ${applicationId}, ${body.user_id}, ${body.application_type}, 'pending', 
        ${JSON.stringify(body.submitted_data)}, NOW(), NOW()
      )
      RETURNING *
    `;
    */

    // Dummy response
    const newApplication = {
      id: Date.now(),
      application_id: applicationId,
      user_id: body.user_id,
      application_type: body.application_type,
      status: 'pending',
      submitted_data: body.submitted_data,
      admin_notes: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      data: { application: newApplication }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating application:', error);
    return Response.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to create application' }
    }, { status: 500 });
  }
}

// Utility functions
async function logActivity({ adminId, action, details, ipAddress }) {
  try {
    // Real implementation:
    /*
    await sql`
      INSERT INTO system_logs (user_id, action, entity_type, details, ip_address, created_at)
      VALUES (${adminId}, ${action}, 'application', ${JSON.stringify(details)}, ${ipAddress}, NOW())
    `;
    */
    console.log('Activity logged:', { adminId, action, details, ipAddress });
  } catch (error) {
    console.error('Failed to log activity:', error);
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
