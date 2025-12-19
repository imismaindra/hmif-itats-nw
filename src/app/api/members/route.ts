import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const limit = searchParams.get('limit');

    let sql = 'SELECT * FROM members ORDER BY level ASC, name ASC';
    const params: any[] = [];

    if (level) {
      sql += ' WHERE level = ?';
      params.push(parseInt(level));
    }

    if (limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const members = await query(sql, params) as any[];
    return NextResponse.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, department, image, email, level } = body;

    const sql = `
      INSERT INTO members (name, position, department, image, email, level)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      name, position, department, image, email, level || 3
    ]);

    return NextResponse.json({
      id: (result as any).insertId,
      message: 'Member created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating member:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
