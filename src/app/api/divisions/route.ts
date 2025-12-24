import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get divisions with their members
    const divisionsSql = 'SELECT * FROM divisions ORDER BY name ASC';
    const divisions = await query(divisionsSql) as any[];

    // Get all division members with member details
    const membersSql = `
      SELECT dm.*, d.name as division_name, m.name, m.position, m.image, m.email, m.level
      FROM division_members dm
      JOIN divisions d ON dm.division_id = d.id
      JOIN members m ON dm.member_id = m.id
      ORDER BY dm.division_id, dm.role DESC, m.name
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
    const { name, description, color } = body;

    // Insert division
    const divisionSql = `
      INSERT INTO divisions (name, description, color)
      VALUES (?, ?, ?)
    `;
    const divisionResult = await query(divisionSql, [name, description, color]);
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
