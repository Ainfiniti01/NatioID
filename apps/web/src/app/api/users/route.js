// import sql from "@/app/api/utils/sql"; // Commented out for presentation - using dummy data

// Dummy data for presentation purposes
const dummyUsers = [
  {
    id: 1,
    email: 'john.doe@government.gov',
    full_name: 'John Doe',
    citizen_id: '12345678901',
    phone: '+2341234567890',
    address: '123 Main Street, Abuja',
    status: 'active',
    verified: true,
    created_at: '2025-01-10T08:00:00Z',
    last_login: '2025-01-15T10:30:00Z'
  },
  {
    id: 2,
    email: 'jane.smith@government.gov',
    full_name: 'Jane Smith',
    citizen_id: '12345678902',
    phone: '+2341234567891',
    address: '456 Oak Avenue, Lagos',
    status: 'active',
    verified: true,
    created_at: '2025-01-09T09:15:00Z',
    last_login: '2025-01-14T14:20:00Z'
  },
  {
    id: 3,
    email: 'bob.johnson@government.gov',
    full_name: 'Bob Johnson',
    citizen_id: '12345678903',
    phone: '+2341234567892',
    address: '789 Pine Road, Kano',
    status: 'pending',
    verified: false,
    created_at: '2025-01-08T11:45:00Z',
    last_login: null
  }
];

export async function GET(request) {
  try {
    // COMMENTED OUT: Real database query for presentation
    // const { searchParams } = new URL(request.url);
    // const status = searchParams.get('status');
    // const search = searchParams.get('search');
    // const limit = parseInt(searchParams.get('limit')) || 50;
    // const offset = parseInt(searchParams.get('offset')) || 0;
    // ... (original query logic commented out)

    // REPLACED WITH: Dummy data for presentation
    const users = dummyUsers;
    const total = dummyUsers.length;

    return Response.json({
      success: true,
      data: users,
      pagination: {
        limit: 50,
        offset: 0,
        total,
        pages: Math.ceil(total / 50)
      }
    });
  } catch (error) {
    console.error('Error fetching users (presentation mode):', error);
    return Response.json(
      { success: false, error: 'Failed to fetch users (presentation mode)' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, full_name, citizen_id, phone, address } = body;

    if (!email || !full_name || !citizen_id) {
      return Response.json(
        { success: false, error: 'Email, full name, and Citizen ID are required' },
        { status: 400 }
      );
    }

    // COMMENTED OUT: Real database operations for presentation
    // Check if email or National ID already exists
    // const existing = await sql`SELECT id FROM users WHERE email = ${email} OR citizen_id = ${citizen_id}`;
    // if (existing.length > 0) { ... }
    // const result = await sql`INSERT INTO users (email, full_name, citizen_id, phone, address) VALUES (${email}, ${full_name}, ${citizen_id}, ${phone}, ${address}) RETURNING ...`;
    // await sql`INSERT INTO system_logs (action, entity_type, entity_id, details) VALUES ('user_created', 'user', ${result[0].id}, ${JSON.stringify({ email, full_name })})`

    // REPLACED WITH: Dummy response for presentation
    const dummyResult = {
      id: Math.floor(Math.random() * 1000) + 100,
      email: email,
      full_name: full_name,
      citizen_id: citizen_id,
      phone: phone || null,
      address: address || null,
      status: 'pending',
      verified: false,
      created_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      data: dummyResult,
      message: 'User created successfully (presentation mode - no real database update)'
    });
  } catch (error) {
    console.error('Error creating user (presentation mode):', error);
    return Response.json(
      { success: false, error: 'Failed to create user (presentation mode)' },
      { status: 500 }
    );
  }
}
