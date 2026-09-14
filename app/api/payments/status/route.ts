import { NextResponse } from 'next/server';
import { getPaymentStatus } from '@/lib/services/payment';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const amount = Number(searchParams.get('amount'));

    if (!orderId || !amount) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const paymentDetails = await getPaymentStatus(orderId, amount);

    // Jika status berhasil (completed/paid)
    if (paymentDetails.status === 'completed' || paymentDetails.status === 'paid') {
      
      // 1. Ambil data groupLink dari DB berdasarkan orderId (mock di sini)
      const groupLink = 'https://chat.whatsapp.com/XYZ123'; // Ganti dengan query DB

      // 2. Trigger Bot Server di Pterodactyl (TANPA API KEY karena pakai API PLTA/PLTC Pterodactyl sendiri)
      try {
        await fetch(`${process.env.BOT_SERVER_URL}/api/join-group`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ groupLink })
        });

        // 3. Update database: Order jadi PAID, create Rental record
        // await db.update(orders).set({ status: 'PAID' })...

      } catch (botError) {
        console.error('Failed to trigger bot:', botError);
        // Tetap return paid agar frontend happy, tapi proses backend di-log
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
