import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = `
      SELECT * FROM division_members
      WHERE division_id = ?
      ORDER BY role DESC, name ASC
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
    const { name, role = 'member', email = '', phone = '', avatar = '', department = '' } = body;

    const sql = `
      INSERT INTO division_members (division_id, name, role, email, phone, avatar, department)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      id, name, role, email, phone, avatar, department
    ]);

    return NextResponse.json({
      id: (result as any).insertId,
      message: 'Member added to division successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error adding member to division:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
