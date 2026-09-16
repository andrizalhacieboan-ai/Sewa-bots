import { BASE_API_URL } from './consts';
import { PakasirConfig, PaymentMethod, PaymentPayload, WatchOptions } from './types/pakasir';
import { sanitizeUrlSafe } from './utils/helpers';

export class Pakasir {
  private watchers: Map<string, NodeJS.Timeout> = new Map();
  private watchTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private lastStatuses: Map<string, string> = new Map();

  constructor(public config: PakasirConfig) {
    this.initialize();
  }

  initialize() {
    const { slug, apikey } = this.config;
    if (!slug || !apikey) {
      throw new Error('Pakasir config is not valid!');
    }
  }

    getPaymentUrl(method: PaymentMethod, order_id: string, amount: number, redirect_url?: string): PaymentPayload {
    order_id = sanitizeUrlSafe(order_id);
    const { slug } = this.config;

    if (order_id?.length < 5) throw new Error('Order ID must be at least 5 characters long!');
    if (amount < 500) throw new Error('Amount must be at least Rp500!');

    let payment_url;
    let payment_number;
    let expired_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    let fee = 0;
    const finalRedirectUrl = redirect_url || null; // <--- UBAH MENJADI CONST BARU

    switch (method) {
      case 'all':
        payment_url = `${BASE_API_URL}/pay/${slug}/${amount}?order_id=${order_id}&redirect=${finalRedirectUrl}`;
        break;
      case 'qris':
        fee = amount > 105000 ? Math.round(0.01 * amount) : Math.round(0.007 * amount + 310);
        payment_url = `${BASE_API_URL}/pay/${slug}/${amount}?order_id=${order_id}&redirect=${finalRedirectUrl}&qris_only=1`;
        break;
      default:
        throw new Error('Invalid payment method!');
    }

    return {
      project: slug,
      order_id,
      amount,
      fee,
      status: 'pending',
      total_payment: amount + fee,
      payment_method: method,
      payment_number,
      payment_url,
      redirect_url: finalRedirectUrl, // <--- GUNAKAN CONST BARU INI
      expired_at,
      completed_at: null,
    };
  }
  async createPayment(method: PaymentMethod, order_id: string, amount: number, redirect_url?: string): Promise<PaymentPayload> {
    order_id = sanitizeUrlSafe(order_id);
    const payload = this.getPaymentUrl(method, order_id, amount, redirect_url);

    const response = await fetch(`${BASE_API_URL}/api/transactioncreate/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project: payload.project,
        api_key: this.config.apikey,
        order_id: payload.order_id,
        amount: payload.amount,
        redirect_url: payload.redirect_url,
      }),
    });

    const json = await response.json();
    if (!json?.data && !json?.payment) {
      throw new Error(json?.message || 'Failed to create payment!');
    }

    return {
      ...payload,
      payment_number: json.payment.payment_number,
      expired_at: json.payment.expired_at,
    };
  }

  async detailPayment(order_id: string, amount: number): Promise<PaymentPayload> {
    order_id = sanitizeUrlSafe(order_id);
    const response = await fetch(
      `${BASE_API_URL}/api/transactiondetail?project=${this.config.slug}&amount=${amount}&order_id=${order_id}&api_key=${this.config.apikey}`,
    );
    const json = await response.json();
    if (!json?.data && !json?.transaction) {
      throw new Error(json?.message || 'Failed to get payment detail!');
    }

    const payload = this.getPaymentUrl(json.transaction.payment_method, order_id, amount);
    return {
      ...payload,
      status: json.transaction.status,
      completed_at: json.transaction.completed_at,
    };
  }
}
