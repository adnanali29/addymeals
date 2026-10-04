import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const { rows } = await pool.query('SELECT * FROM recipes ORDER BY created_at DESC');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, calories, type, image_url, status = 'Active' } = body;
  const { rows } = await pool.query(
    `INSERT INTO recipes (title, calories, type, image_url, status)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [title, calories, type, image_url, status]
  );
  return NextResponse.json(rows[0], { status: 201 });
}
