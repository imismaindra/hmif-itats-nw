import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth-middleware';

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

    const posts = await query(sql, params) as any[];

    // Parse JSON fields
    const processedPosts = posts.map(post => {
      let tags = [];

      try {
        if (typeof post.tags === 'string') {
          tags = JSON.parse(post.tags || '[]');
        } else if (post.tags) {
          tags = post.tags;
        }
      } catch (e) {
        console.error('Error parsing tags JSON:', e);
        tags = [];
      }

      return {
        ...post,
        tags
      };
    });

    return NextResponse.json(processedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.member_id) {
      return NextResponse.json({
        error: 'User not associated with a member. Please log out and log back in to refresh your session.',
        code: 'SESSION_EXPIRED'
      }, { status: 400 });
    }

    // Get user's member information
    const members = await query('SELECT name FROM members WHERE id = ?', [user.member_id]) as any[];
    if (members.length === 0) {
      return NextResponse.json({ error: 'Member not found' }, { status: 400 });
    }

    const memberName = members[0].name;

    const body = await request.json();
    const { title, excerpt, content, date, category, priority, tags, image } = body;

    // Validate category enum
    const validCategories = ['pengumuman', 'berita'];
    if (!validCategories.includes(category)) {
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

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const sql = `
      INSERT INTO posts (
        title, slug, excerpt, content, date,
        author_id, author_name, category, priority, tags, image
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      title, slug, excerpt, content, date,
      user.id, memberName, category, priority || 'sedang',
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
