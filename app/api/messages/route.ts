import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const { rows } = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, topic, message } = body;
  const { rows } = await pool.query(
    `INSERT INTO messages (name, email, phone, topic, message) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, phone, topic, message]
  );
  return NextResponse.json(rows[0], { status: 201 });
}
