import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { status } = body;
  const { rows } = await pool.query(
    'UPDATE orders SET status=$1, updated_at=now() WHERE id=$2 RETURNING *',
    [status, id]
  );
  return NextResponse.json(rows[0]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM orders WHERE id=$1', [id]);
  return NextResponse.json({ success: true });
}
