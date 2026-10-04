import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const { rows } = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer_name, customer_phone, customer_email, items, total_amount, status = 'Pending' } = body;
  const { rows } = await pool.query(
    `INSERT INTO orders (customer_name, customer_phone, customer_email, items, total_amount, status)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [customer_name, customer_phone, customer_email, JSON.stringify(items), total_amount, status]
  );
  return NextResponse.json(rows[0], { status: 201 });
}
