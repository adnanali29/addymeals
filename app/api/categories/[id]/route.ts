import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { name, emoji, text_accent } = body;
  const { rows } = await pool.query(
    `UPDATE categories SET name=$1, emoji=$2, text_accent=$3, updated_at=now()
     WHERE id=$4 RETURNING *`,
    [name, emoji, text_accent, id]
  );
  return NextResponse.json(rows[0]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM categories WHERE id=$1', [id]);
  return NextResponse.json({ success: true });
}
