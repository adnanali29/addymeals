import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { category_id, item_name } = body;
  const { rows } = await pool.query(
    `INSERT INTO category_items (category_id, item_name) VALUES ($1,$2) RETURNING *`,
    [category_id, item_name]
  );
  return NextResponse.json(rows[0], { status: 201 });
}
