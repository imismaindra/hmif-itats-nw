import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const limit = searchParams.get('limit');

    let sql = `
      SELECT m.*, p.name as position_name, p.level as position_level, p.can_be_empty
      FROM members m
      LEFT JOIN positions p ON m.position_id = p.id
      ORDER BY p.level ASC, m.name ASC
    `;
    const params: any[] = [];

    if (level) {
      sql += ' WHERE p.level = ?';
      params.push(parseInt(level));
    }

    if (limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const members = await query(sql, params) as any[];

    // Transform the data to match the expected interface
    const transformedMembers = members.map(member => ({
      id: member.id,
      name: member.name,
      position_id: member.position_id,
      position: member.position_name ? {
        id: member.position_id,
        name: member.position_name,
        level: member.position_level,
        can_be_empty: member.can_be_empty || false
      } : undefined,
      email: member.email,
      phone: member.phone,
      image: member.image,
      is_active: member.is_active,
      created_at: member.created_at,
      updated_at: member.updated_at
    }));

    return NextResponse.json(transformedMembers);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position_id, image, email, phone } = body;

    const sql = `
      INSERT INTO members (name, position_id, image, email, phone)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      name, position_id, image, email, phone
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
