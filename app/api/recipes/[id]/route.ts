import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { title, calories, type, image_url } = body;
  const { rows } = await pool.query(
    `UPDATE recipes SET title=$1, calories=$2, type=$3, image_url=$4, updated_at=now()
     WHERE id=$5 RETURNING *`,
    [title, calories, type, image_url, id]
  );
  return NextResponse.json(rows[0]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM recipes WHERE id=$1', [id]);
  return NextResponse.json({ success: true });
}
