import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = `
      SELECT dm.*, m.name, m.position, m.image, m.email, m.level
      FROM division_members dm
      JOIN members m ON dm.member_id = m.id
      WHERE dm.division_id = ?
      ORDER BY dm.role DESC, m.name ASC
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
    const { member_id, role = 'member' } = body;

    if (!member_id) {
      return NextResponse.json({ error: 'member_id is required' }, { status: 400 });
    }

    const sql = `
      INSERT INTO division_members (division_id, member_id, role)
      VALUES (?, ?, ?)
    `;

    const result = await query(sql, [id, member_id, role]);

    return NextResponse.json({
      id: (result as any).insertId,
      message: 'Member added to division successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding member to division:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
