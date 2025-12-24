import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = 'SELECT * FROM activities WHERE id = ?';
    const activities = await query(sql, [id]) as any[];

    if (activities.length === 0) {
      return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
    }

    return NextResponse.json(activities[0]);
  } catch (error) {
    console.error('Error fetching activity:', error);
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
      title,
      category,
      date,
      end_date,
      participants_count,
      participants_description,
      description,
      detailed_description,
      status,
      location,
      image,
      photos
    } = body;

    // Validate category enum
    const validCategories = ['INTERNAL', 'SOSIAL', 'AKADEMIK', 'KOMPETISI', 'LAINNYA'];
    if (category && !validCategories.includes(category)) {
      return NextResponse.json({
        error: 'Invalid category. Must be one of: ' + validCategories.join(', ')
      }, { status: 400 });
    }

    // Validate status enum
    const validStatuses = ['upcoming', 'ongoing', 'completed', 'cancelled'];
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
      UPDATE activities
      SET title = ?, slug = ?, category = ?, date = ?, end_date = ?,
          participants_count = ?, participants_description = ?,
          description = ?, detailed_description = ?, status = ?,
          location = ?, image = ?, photos = ?
      WHERE id = ?
    `;

    await query(sql, [
      title, slug, category, date, end_date || null,
      participants_count || 0, participants_description || '',
      description || '', detailed_description || '', status || 'upcoming',
      location || '', image || '', photos ? JSON.stringify(photos) : null, id
    ]);

    return NextResponse.json({ message: 'Activity updated successfully' });
  } catch (error) {
    console.error('Error updating activity:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = 'DELETE FROM activities WHERE id = ?';
    await query(sql, [id]);

    return NextResponse.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
