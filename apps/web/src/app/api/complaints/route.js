// import sql from "@/app/api/utils/sql"; // Commented out for presentation - using dummy data

// Dummy data for presentation purposes
const dummyComplaints = [
  {
    id: 1,
    complaint_id: 'CABC123',
    user_id: 1,
    title: 'Road Maintenance Issue',
    description: 'Potholes on main street need urgent repair',
    category: 'Infrastructure',
    status: 'pending',
    created_at: '2025-01-15T10:30:00Z',
    updated_at: '2025-01-15T10:30:00Z',
    user_name: 'John Doe',
    user_email: 'john.doe@government.gov'
  },
  {
    id: 2,
    complaint_id: 'CDEF456',
    user_id: 2,
    title: 'Water Supply Problem',
    description: 'No water supply in residential area for 2 days',
    category: 'Utilities',
    status: 'in_progress',
    created_at: '2025-01-14T14:20:00Z',
    updated_at: '2025-01-14T16:45:00Z',
    user_name: 'Jane Smith',
    user_email: 'jane.smith@government.gov'
  },
  {
    id: 3,
    complaint_id: 'CGHI789',
    user_id: 3,
    title: 'Street Light Malfunction',
    description: 'Multiple street lights not working in downtown area',
    category: 'Infrastructure',
    status: 'resolved',
    created_at: '2025-01-13T09:15:00Z',
    updated_at: '2025-01-13T11:30:00Z',
    user_name: 'Bob Johnson',
    user_email: 'bob.johnson@government.gov'
  }
];

export async function GET(request) {
  try {
    // COMMENTED OUT: Real database query for presentation
    // const { searchParams } = new URL(request.url);
    // const status = searchParams.get('status');
    // const category = searchParams.get('category');
    // const limit = parseInt(searchParams.get('limit')) || 50;
    // const offset = parseInt(searchParams.get('offset')) || 0;
    // ... (original query logic commented out)

    // REPLACED WITH: Dummy data for presentation
    const complaints = dummyComplaints;

    return Response.json({
      success: true,
      data: complaints,
      pagination: {
        limit: 50,
        offset: 0,
        total: complaints.length
      }
    });
  } catch (error) {
    console.error('Error fetching complaints (presentation mode):', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch complaints (presentation mode)',
        message: 'This is a presentation placeholder - no real database connection'
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, title, description, category } = body;

    if (!user_id || !title || !description || !category) {
      return Response.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'user_id, title, description, and category are required'
        },
        { status: 400 }
      );
    }

    // COMMENTED OUT: Real database operations for presentation
    // Generate complaint ID
    // const complaint_id = 'C' + Math.random().toString(36).substr(2, 6).toUpperCase();
    // const result = await sql`INSERT INTO complaints (user_id, complaint_id, title, description, category) VALUES (${user_id}, ${complaint_id}, ${title}, ${description}, ${category}) RETURNING *`;
    // await sql`INSERT INTO system_logs (user_id, action, entity_type, entity_id, details) VALUES (${user_id}, 'complaint_submitted', 'complaint', ${result[0].id}, ${JSON.stringify({ category })})`

    // REPLACED WITH: Dummy response for presentation
    const dummyResult = {
      id: Math.floor(Math.random() * 1000) + 100,
      complaint_id: 'C' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      user_id: user_id,
      title: title,
      description: description,
      category: category,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      data: dummyResult,
      message: 'Complaint submitted successfully (presentation mode - no real database update)'
    });
  } catch (error) {
    console.error('Error creating complaint (presentation mode):', error);
    return Response.json(
      {
        success: false,
        error: 'Failed to create complaint (presentation mode)',
        message: 'This is a presentation placeholder - no real database connection'
      },
      { status: 500 }
    );
  }
}
