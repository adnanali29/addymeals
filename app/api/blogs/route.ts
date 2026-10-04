import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const { rows } = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, category, image_url, excerpt, content, read_time, quick_tip, published = true } = body;
  const { rows } = await pool.query(
    `INSERT INTO blogs (title, category, image_url, excerpt, content, read_time, quick_tip, published)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [title, category, image_url, excerpt, content, read_time, quick_tip, published]
  );
  return NextResponse.json(rows[0], { status: 201 });
}
