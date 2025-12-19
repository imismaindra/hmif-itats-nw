import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    let sql = 'SELECT * FROM posts ORDER BY date DESC';
    const params: any[] = [];

    if (category && category !== 'all') {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    if (limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const posts = await query(sql, params);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, date, author, category, priority, tags, image } = body;

    const sql = `
      INSERT INTO posts (title, excerpt, content, date, author, category, priority, tags, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      title, excerpt, content, date, author, category, priority || 'sedang',
      JSON.stringify(tags || []), image
    ]);

    return NextResponse.json({
      id: (result as any).insertId,
      message: 'Post created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
