import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = 'SELECT * FROM programs WHERE id = ?';
    const programs = await query(sql, [id]) as any[];

    if (programs.length === 0) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    const program = programs[0];
    // Parse JSON fields
    program.team = JSON.parse(program.team || '[]');
    program.photos = JSON.parse(program.photos || '[]');

    return NextResponse.json(program);
  } catch (error) {
    console.error('Error fetching program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title, description, start_date, end_date, status, progress,
      department, participants, budget, leader, team, location, photos, detailed_description
    } = body;

    const sql = `
      UPDATE programs
      SET title = ?, description = ?, start_date = ?, end_date = ?, status = ?, progress = ?,
          department = ?, participants = ?, budget = ?, leader = ?, team = ?, location = ?, photos = ?, detailed_description = ?
      WHERE id = ?
    `;

    await query(sql, [
      title, description, start_date, end_date, status || 'upcoming', progress || 0,
      department, participants, budget, leader,
      JSON.stringify(team || []), location, JSON.stringify(photos || []), detailed_description, id
    ]);

    return NextResponse.json({ message: 'Program updated successfully' });
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = 'DELETE FROM programs WHERE id = ?';
    await query(sql, [id]);

    return NextResponse.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
