import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get divisions with their members
    const divisionsSql = 'SELECT * FROM divisions ORDER BY name ASC';
    const divisions = await query(divisionsSql) as any[];

    // Get all division members
    const membersSql = `
      SELECT dm.*, d.name as division_name
      FROM division_members dm
      JOIN divisions d ON dm.division_id = d.id
      ORDER BY dm.division_id, dm.role DESC, dm.name
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
    const { name, description, color, members } = body;

    // Insert division
    const divisionSql = `
      INSERT INTO divisions (name, description, color)
      VALUES (?, ?, ?)
    `;
    const divisionResult = await query(divisionSql, [name, description, color]);
    const divisionId = (divisionResult as any).insertId;

    // Insert members if provided
    if (members && members.length > 0) {
      const memberValues = members.map((member: any) => [
        divisionId, member.name, member.role || 'member', member.email || '',
        member.phone || '', member.avatar || '', member.department || ''
      ]);

      const memberSql = `
        INSERT INTO division_members (division_id, name, role, email, phone, avatar, department)
        VALUES ${memberValues.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ')}
      `;

      await query(memberSql, memberValues.flat());
    }

    return NextResponse.json({
      id: divisionId,
      message: 'Division created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating division:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
