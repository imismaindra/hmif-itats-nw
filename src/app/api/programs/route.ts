import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let sql = 'SELECT * FROM programs ORDER BY start_date DESC';
    const params: any[] = [];

    if (status && status !== 'all') {
      sql += ' WHERE status = ?';
      params.push(status);
    }

    if (limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const programs = await query(sql, params) as any[];

    // Parse JSON fields - handle both string and object types
    const processedPrograms = programs.map(program => {
      let team = [];
      let photos = [];

      try {
        if (typeof program.team === 'string') {
          team = JSON.parse(program.team || '[]');
        } else if (program.team) {
          team = program.team;
        }
      } catch (e) {
        console.error('Error parsing team JSON for program', program.id, ':', e);
        team = [];
      }

      try {
        if (typeof program.photos === 'string') {
          photos = JSON.parse(program.photos || '[]');
        } else if (program.photos) {
          photos = program.photos;
        }
      } catch (e) {
        console.error('Error parsing photos JSON for program', program.id, ':', e);
        photos = [];
      }

      return {
        ...program,
        team,
        photos
      };
    });

    return NextResponse.json(processedPrograms);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    const sql = `
      INSERT INTO programs (
        title, slug, description, detailed_description, start_date, end_date,
        status, progress, department, participants_count, budget_amount,
        budget_display, leader_id, leader_name, team, location, photos
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      title, slug, description || '', detailed_description || '', start_date, end_date,
      status || 'upcoming', progress || 0, department || '', participants_count || 0,
      budget_amount || 0, budget_display || '', leader_id || null, leader_name || '',
      JSON.stringify(team || []), location || '', JSON.stringify(photos || [])
    ]);

    return NextResponse.json({
      id: (result as any).insertId,
      message: 'Program created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
