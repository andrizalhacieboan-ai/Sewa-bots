import { NextResponse } from 'next/server';
import { createQrisPayment } from '@/lib/services/payment';

export async function POST(req: Request) {
  try {
    const { orderId, amount } = await req.json();

    if (!orderId || !amount) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;
    const paymentPayload = await createQrisPayment(orderId, amount, redirectUrl);

    // In real app: Save paymentUrl to database associated with orderId

    return NextResponse.json({
      success: true,
      data: paymentPayload
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
