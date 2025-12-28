import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get divisions with their members
    const divisionsSql = 'SELECT * FROM divisions ORDER BY name ASC';
    const divisions = await query(divisionsSql) as any[];

    // Get all division members with member details and position info
    const membersSql = `
      SELECT dm.*, d.name as division_name, m.name, p.name as position, m.image, m.email, p.level
      FROM division_members dm
      JOIN divisions d ON dm.division_id = d.id
      JOIN members m ON dm.member_id = m.id
      LEFT JOIN positions p ON m.position_id = p.id
      ORDER BY dm.division_id, dm.is_coordinator DESC, m.name
    `;
    const allMembers = await query(membersSql) as any[];

    // Group members by division
    const divisionsWithMembers = divisions.map(division => ({
      ...division,
      members: allMembers.filter(member => member.division_id === division.id)
    }));

    return NextResponse.json(divisionsWithMembers);
  } catch (error) {
    console.error('Error fetching divisions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, gradient_from, gradient_to } = body;

    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Insert division
    const divisionSql = `
      INSERT INTO divisions (name, slug, description, gradient_from, gradient_to)
      VALUES (?, ?, ?, ?, ?)
    `;
    const divisionResult = await query(divisionSql, [name, slug, description, gradient_from, gradient_to]);
    const divisionId = (divisionResult as any).insertId;

    return NextResponse.json({
      id: divisionId,
      message: 'Division created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating division:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
