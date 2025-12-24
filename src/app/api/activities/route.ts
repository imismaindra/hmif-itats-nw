import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const slug = searchParams.get('slug');

    let sql = 'SELECT * FROM activities';
    const params: any[] = [];
    const conditions: string[] = [];

    if (slug) {
      conditions.push('slug = ?');
      params.push(slug);
    }

    if (category && category !== 'all') {
      conditions.push('category = ?');
      params.push(category);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY date DESC';

    if (limit && !slug) { // Don't limit when fetching single activity by slug
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const activities = await query(sql, params) as any[];

    // Parse photos JSON field
    const processedActivities = activities.map(activity => {
      let photos = [];
      try {
        if (typeof activity.photos === 'string') {
          photos = JSON.parse(activity.photos || '[]');
        } else if (activity.photos) {
          photos = activity.photos;
        }
      } catch (e) {
        console.error('Error parsing photos JSON for activity', activity.id, ':', e);
        photos = [];
      }

      return {
        ...activity,
        photos
      };
    });

    return NextResponse.json(processedActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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
    if (!validCategories.includes(category)) {
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

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const sql = `
      INSERT INTO activities (
        title, slug, category, date, end_date,
        participants_count, participants_description,
        description, detailed_description, status,
        location, image, photos
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      title, slug, category, date, end_date || null,
      participants_count || 0, participants_description || '',
      description || '', detailed_description || '', status || 'upcoming',
      location || '', image || '', photos ? JSON.stringify(photos) : null
    ]);

    return NextResponse.json({
      id: (result as any).insertId,
      message: 'Activity created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
