import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = `
      SELECT m.*, p.name as position_name, p.level as position_level, p.can_be_empty
      FROM members m
      LEFT JOIN positions p ON m.position_id = p.id
      WHERE m.id = ?
    `;
    const members = await query(sql, [id]) as any[];

    if (members.length === 0) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Transform the data to match the expected interface
    const member = members[0];
    const transformedMember = {
      id: member.id,
      name: member.name,
      position_id: member.position_id,
      position: member.position_name ? {
        id: member.position_id,
        name: member.position_name,
        level: member.position_level,
        can_be_empty: member.can_be_empty || false
      } : undefined,
      email: member.email,
      phone: member.phone,
      image: member.image,
      is_active: member.is_active,
      created_at: member.created_at,
      updated_at: member.updated_at
    };

    return NextResponse.json(transformedMember);
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, position_id, email, phone, image } = body;

    const sql = `
      UPDATE members
      SET name = ?, position_id = ?, email = ?, phone = ?, image = ?
      WHERE id = ?
    `;

    // Replace undefined with null for SQL compatibility
    const params = [
      name || null,
      position_id || null,
      email || null,
      phone || null,
      image || null,
      id
    ];

    await query(sql, params);

    return NextResponse.json({ message: 'Member updated successfully' });
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = 'DELETE FROM members WHERE id = ?';
    await query(sql, [id]);

    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
