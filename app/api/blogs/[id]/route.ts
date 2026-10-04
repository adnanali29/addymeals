import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { title, category, image_url, excerpt, content, read_time, quick_tip, published } = body;
  const { rows } = await pool.query(
    `UPDATE blogs SET
      title=COALESCE($1, title),
      category=COALESCE($2, category),
      image_url=COALESCE($3, image_url),
      excerpt=COALESCE($4, excerpt),
      content=COALESCE($5, content),
      read_time=COALESCE($6, read_time),
      quick_tip=COALESCE($7, quick_tip),
      published=COALESCE($8, published),
      updated_at=now()
     WHERE id=$9 RETURNING *`,
    [title, category, image_url, excerpt, content, read_time, quick_tip, published, id]
  );
  return NextResponse.json(rows[0]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM blogs WHERE id=$1', [id]);
  return NextResponse.json({ success: true });
}
