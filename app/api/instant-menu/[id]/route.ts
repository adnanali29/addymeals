import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (body.name !== undefined) { fields.push(`name=$${idx++}`); values.push(body.name); }
  if (body.price !== undefined) { fields.push(`price=$${idx++}`); values.push(body.price); }
  if (body.note !== undefined) { fields.push(`note=$${idx++}`); values.push(body.note); }
  if (body.available !== undefined) { fields.push(`available=$${idx++}`); values.push(body.available); }
  if (body.display_order !== undefined) { fields.push(`display_order=$${idx++}`); values.push(body.display_order); }

  if (fields.length === 0) return NextResponse.json({ error: 'No fields provided' }, { status: 400 });

  fields.push(`updated_at=now()`);
  values.push(id);

  const query = `UPDATE instant_menu SET ${fields.join(', ')} WHERE id=$${idx} RETURNING *`;
  const { rows } = await pool.query(query, values);
  return NextResponse.json(rows[0]);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await pool.query('DELETE FROM instant_menu WHERE id=$1', [id]);
  return NextResponse.json({ success: true });
}
