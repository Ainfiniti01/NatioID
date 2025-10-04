import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT 
        c.*,
        u.full_name as user_name,
        u.email as user_email,
        u.phone as user_phone
      FROM complaints c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = ${id}
    `;

    if (result.length === 0) {
      return Response.json(
        { success: false, error: 'Complaint not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch complaint' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, response, admin_notes } = body;

    const updates = [];
    const values = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      updates.push(`status = $${paramCount}`);
      values.push(status);
    }

    if (response) {
      paramCount++;
      updates.push(`response = $${paramCount}`);
      values.push(response);
    }

    if (updates.length === 0) {
      return Response.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Add updated_at
    paramCount++;
    updates.push(`updated_at = $${paramCount}`);
    values.push(new Date().toISOString());

    // Add WHERE clause
    paramCount++;
    values.push(id);

    const query = `UPDATE complaints SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json(
        { success: false, error: 'Complaint not found' },
        { status: 404 }
      );
    }

    // Log the action
    await sql`
      INSERT INTO system_logs (action, entity_type, entity_id, details)
      VALUES ('complaint_updated', 'complaint', ${id}, ${JSON.stringify({ status, response })})
    `;

    return Response.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error updating complaint:', error);
    return Response.json(
      { success: false, error: 'Failed to update complaint' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Get complaint details before deletion for logging
    const complaint = await sql`
      SELECT * FROM complaints WHERE id = ${id}
    `;

    if (complaint.length === 0) {
      return Response.json(
        { success: false, error: 'Complaint not found' },
        { status: 404 }
      );
    }

    // Update status to closed instead of deleting
    const result = await sql`
      UPDATE complaints 
      SET status = 'closed', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    // Log the action
    await sql`
      INSERT INTO system_logs (user_id, action, entity_type, entity_id, details)
      VALUES (${complaint[0].user_id}, 'complaint_closed', 'complaint', ${id}, ${JSON.stringify({ reason: 'admin_closure' })})
    `;

    return Response.json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    console.error('Error closing complaint:', error);
    return Response.json(
      { success: false, error: 'Failed to close complaint' },
      { status: 500 }
    );
  }
}