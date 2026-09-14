import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';

export async function POST(req: Request) {
  try {
    const { packageName, duration, amount, groupLink } = await req.json();

    // Validasi input
    if (!packageName || !amount || !groupLink || !groupLink.includes('chat.whatsapp.com')) {
      return NextResponse.json({ error: 'Data tidak valid' }, { status: 400 });
    }

    // Buat Order ID unik
    const orderId = `AS-${Date.now()}`;

    // Simpan ke database Turso
    await db.insert(orders).values({
      id: orderId,
      packageName,
      duration,
      amount,
      groupLink,
      status: 'PENDING',
    });

    return NextResponse.json({
      success: true,
      orderId,
      amount
    });

  } catch (error) {
    console.error('Create Order Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
