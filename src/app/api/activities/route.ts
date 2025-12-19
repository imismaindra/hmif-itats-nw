import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    let sql = 'SELECT * FROM activities ORDER BY date DESC';
    const params: any[] = [];

    if (category && category !== 'all') {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    if (limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const activities = await query(sql, params) as any[];
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, date, participants, description, status, image } = body;

    const sql = `
      INSERT INTO activities (title, category, date, participants, description, status, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      title, category, date, participants, description, status || 'Selesai', image
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
