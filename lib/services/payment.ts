import { Pakasir } from '@/lib/pakasir';
import { PaymentPayload } from '@/lib/types/pakasir';

const pakasirInstance = new Pakasir({
  slug: process.env.PAKASIR_SLUG || 'andri-store',
  apikey: process.env.PAKASIR_API_KEY || '',
});

export async function createQrisPayment(orderId: string, amount: number, redirectUrl?: string): Promise<PaymentPayload> {
  try {
    const payment = await pakasirInstance.createPayment('qris', orderId, amount, redirectUrl);
    return payment;
  } catch (error) {
    console.error('Payment Creation Error:', error);
    throw new Error('Gagal membuat transaksi pembayaran');
  }
}

export async function getPaymentStatus(orderId: string, amount: number): Promise<PaymentPayload> {
  try {
    const details = await pakasirInstance.detailPayment(orderId, amount);
    return details;
  } catch (error) {
    console.error('Payment Status Error:', error);
    throw new Error('Gagal mengecek status pembayaran');
  }
}
