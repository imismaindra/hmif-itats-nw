import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
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
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const {
      title, description, detailed_description, start_date, end_date,
      status, progress, department, participants_count, budget_amount,
      budget_display, leader_id, leader_name, team, location, photos
    } = body;

    // Validate status enum
    const validStatuses = ['completed', 'ongoing', 'upcoming', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({
        error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      }, { status: 400 });
    }

    // Generate slug from title if title is provided
    let slug;
    if (title) {
      slug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }

    const sql = `
      UPDATE programs
      SET title = ?, slug = ?, description = ?, detailed_description = ?, start_date = ?, end_date = ?,
          status = ?, progress = ?, department = ?, participants_count = ?, budget_amount = ?,
          budget_display = ?, leader_id = ?, leader_name = ?, team = ?, location = ?, photos = ?
      WHERE id = ?
    `;

    await query(sql, [
      title, slug, description || '', detailed_description || '', start_date, end_date,
      status || 'upcoming', progress || 0, department || '', participants_count || 0,
      budget_amount || 0, budget_display || '', leader_id || null, leader_name || '',
      JSON.stringify(team || []), location || '', JSON.stringify(photos || []), id
    ]);

    return NextResponse.json({ message: 'Program updated successfully' });
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = 'DELETE FROM programs WHERE id = ?';
    await query(sql, [id]);

    return NextResponse.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
