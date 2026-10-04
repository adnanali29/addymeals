import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const { rows: cats } = await pool.query('SELECT * FROM categories ORDER BY display_order ASC');
  const { rows: items } = await pool.query('SELECT * FROM category_items ORDER BY display_order ASC');
  const combined = cats.map((cat: any) => ({
    ...cat,
    items: items.filter((i: any) => i.category_id === cat.id)
  }));
  return NextResponse.json(combined);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, emoji, text_accent, bg_color, border_color, shadow_style } = body;
  const { rows } = await pool.query(
    `INSERT INTO categories (name, emoji, text_accent, bg_color, border_color, shadow_style)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, emoji, text_accent, bg_color ?? 'bg-white', border_color ?? 'border-gray-200', shadow_style ?? 'shadow-sm']
  );
  return NextResponse.json(rows[0], { status: 201 });
}
