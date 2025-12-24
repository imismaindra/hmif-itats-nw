import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = 'SELECT * FROM posts WHERE id = ?';
    const posts = await query(sql, [id]) as any[];

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
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { title, excerpt, content, date, category, priority, tags, image, is_active } = body;

    // Validate category enum
    const validCategories = ['pengumuman', 'berita'];
    if (category && !validCategories.includes(category)) {
      return NextResponse.json({
        error: 'Invalid category. Must be one of: ' + validCategories.join(', ')
      }, { status: 400 });
    }

    // Validate priority enum
    const validPriorities = ['tinggi', 'sedang', 'rendah'];
    if (priority && !validPriorities.includes(priority)) {
      return NextResponse.json({
        error: 'Invalid priority. Must be one of: ' + validPriorities.join(', ')
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
      UPDATE posts
      SET title = ?, slug = ?, excerpt = ?, content = ?, date = ?,
          category = ?, priority = ?, tags = ?, image = ?, is_active = ?
      WHERE id = ?
    `;

    await query(sql, [
      title, slug, excerpt, content, date,
      category, priority || 'sedang',
      JSON.stringify(tags || []), image, is_active !== undefined ? is_active : true, id
    ]);

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { is_active } = body;

    if (is_active === undefined) {
      return NextResponse.json({ error: 'is_active field is required' }, { status: 400 });
    }

    const sql = 'UPDATE posts SET is_active = ? WHERE id = ?';
    await query(sql, [is_active, id]);

    return NextResponse.json({
      message: `Post ${is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling post status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  try {
    const { id } = await context.params;
    const sql = 'DELETE FROM posts WHERE id = ?';
    await query(sql, [id]);

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
