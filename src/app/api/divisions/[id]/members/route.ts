import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = `
      SELECT dm.*, m.name, p.name as position, m.image, m.email, p.level
      FROM division_members dm
      JOIN members m ON dm.member_id = m.id
      LEFT JOIN positions p ON m.position_id = p.id
      WHERE dm.division_id = ?
      ORDER BY dm.is_coordinator DESC, m.name ASC
    `;
    const members = await query(sql, [id]);
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching division members:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { member_id, is_coordinator = false } = body;

    if (!member_id) {
      return NextResponse.json({ error: 'member_id is required' }, { status: 400 });
    }

    // Check if member is already in another division
    const checkMemberSql = `
      SELECT dm.division_id, d.name as division_name
      FROM division_members dm
      JOIN divisions d ON dm.division_id = d.id
      WHERE dm.member_id = ?
    `;
    const existingMembership = await query(checkMemberSql, [member_id]) as any[];

    if (existingMembership.length > 0) {
      const existingDivision = existingMembership[0];
      return NextResponse.json({
        error: `Member is already in division "${existingDivision.division_name}". A member can only be in one division.`
      }, { status: 400 });
    }

    // Check if member has a position that cannot be empty (except for organization-wide positions)
    const checkPositionSql = `
      SELECT p.can_be_empty, p.division_id
      FROM members m
      JOIN positions p ON m.position_id = p.id
      WHERE m.id = ?
    `;
    const positionCheck = await query(checkPositionSql, [member_id]) as any[];

    if (positionCheck.length > 0) {
      const position = positionCheck[0];
      // If position cannot be empty and is division-specific, ensure it's assigned properly
      if (!position.can_be_empty && position.division_id) {
        // This is a division-specific position that cannot be empty
        // Additional validation can be added here if needed
      }
    }

    const sql = `
      INSERT INTO division_members (division_id, member_id, is_coordinator)
      VALUES (?, ?, ?)
    `;

    const result = await query(sql, [id, member_id, is_coordinator]);

    return NextResponse.json({
      id: (result as any).insertId,
      message: 'Member added to division successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding member to division:', error);

    // Handle duplicate key error (member already in another division)
    if ((error as any).code === 'ER_DUP_ENTRY') {
      return NextResponse.json({
        error: 'Member is already assigned to a division. A member can only be in one division.'
      }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
