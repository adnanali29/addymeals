import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const { rows } = await pool.query('SELECT items, total_amount, status FROM orders');
  return NextResponse.json(rows);
}
