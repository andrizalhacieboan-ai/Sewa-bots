import { NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/services/payment';
import { db } from '@/lib/db';
import { orders, rentals } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const amount = Number(searchParams.get('amount'));

    if (!orderId || !amount) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const paymentDetails = await getPaymentStatus(orderId, amount);

    if (paymentDetails.status === 'completed' || paymentDetails.status === 'paid') {
      // 1. Ambil data order dari database Turso
      const order = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
      
      if (order.length > 0 && order[0].status !== 'PAID') {
        const groupLink = order[0].groupLink;
        const durationDays = order[0].duration;

        // 2. Trigger Bot Server di Pterodactyl
        try {
          await fetch(`${process.env.BOT_SERVER_URL}/api/join-group`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ groupLink })
          });
        } catch (botError) {
          console.error('Failed to trigger bot:', botError);
        }

        // 3. Update database Turso: Order jadi PAID
        await db.update(orders).set({ status: 'PAID' }).where(eq(orders.id, orderId));

        // 4. Buat data Rental baru
        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + durationDays);

        await db.insert(rentals).values({
          id: `RNT-${Date.now()}`,
          orderId: orderId,
          groupLink: groupLink,
          status: 'ACTIVE',
          startedAt: new Date(),
          expiredAt: expiredDate,
        });
      }
    }

    return NextResponse.json({
      success: true,
      status: paymentDetails.status
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
