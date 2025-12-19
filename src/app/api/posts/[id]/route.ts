import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = 'SELECT * FROM posts WHERE id = ?';
    const posts = await query(sql, [params.id]) as any[];

    if (posts.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(posts[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, excerpt, content, date, author, category, priority, tags, image } = body;

    const sql = `
      UPDATE posts
      SET title = ?, excerpt = ?, content = ?, date = ?, author = ?,
          category = ?, priority = ?, tags = ?, image = ?
      WHERE id = ?
    `;

    await query(sql, [
      title, excerpt, content, date, author, category, priority || 'sedang',
      JSON.stringify(tags || []), image, params.id
    ]);

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = 'DELETE FROM posts WHERE id = ?';
    await query(sql, [params.id]);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
