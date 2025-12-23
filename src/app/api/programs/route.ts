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
        console.error('Error parsing team JSON:', e);
        team = [];
      }

      try {
        if (typeof program.photos === 'string') {
          photos = JSON.parse(program.photos || '[]');
        } else if (program.photos) {
          photos = program.photos;
        }
      } catch (e) {
        console.error('Error parsing photos JSON:', e);
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
      title, description, start_date, end_date, status, progress,
      department, participants, budget, leader, team, location, photos, detailed_description
    } = body;

    const sql = `
      INSERT INTO programs (title, description, start_date, end_date, status, progress,
                           department, participants, budget, leader, team, location, photos, detailed_description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      title, description, start_date, end_date, status || 'upcoming', progress || 0,
      department, participants, budget, leader,
      JSON.stringify(team || []), location, JSON.stringify(photos || []), detailed_description
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
