import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = 'SELECT * FROM members WHERE id = ?';
    const members = await query(sql, [params.id]) as any[];

    if (members.length === 0) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json(members[0]);
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, position, department, image, email, level } = body;

    const sql = `
      UPDATE members
      SET name = ?, position = ?, department = ?, image = ?, email = ?, level = ?
      WHERE id = ?
    `;

    await query(sql, [
      name, position, department, image, email, level || 3, params.id
    ]);

    return NextResponse.json({ message: 'Member updated successfully' });
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = 'DELETE FROM members WHERE id = ?';
    await query(sql, [params.id]);

    return NextResponse.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
