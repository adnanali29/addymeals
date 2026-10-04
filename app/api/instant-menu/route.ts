import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const { rows } = await pool.query('SELECT * FROM instant_menu ORDER BY display_order ASC');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, price, note, available = true } = body;
  const { rows } = await pool.query(
    `INSERT INTO instant_menu (name, price, note, available) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, price, note, available]
  );
  return NextResponse.json(rows[0], { status: 201 });
}
