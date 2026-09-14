export interface PakasirConfig {
  slug: string;
  apikey: string;
}

export type PaymentMethod = 'all' | 'qris' | 'paypal' | 'cimb_niaga_va' | 'bni_va' | 'sampoerna_va' | 'bnc_va' | 'maybank_va' | 'permata_va' | 'atm_bersama_va' | 'artha_graha_va' | 'bri_va';

export interface PaymentPayload {
  project: string;
  order_id: string;
  amount: number;
  fee: number;
  status: string;
  total_payment: number;
  payment_method: PaymentMethod;
  payment_number?: string;
  payment_url: string;
  redirect_url: string | null;
  expired_at: string | null;
  completed_at: string | null;
}

export interface WatchOptions {
  interval?: number;
  timeout?: number;
  onStatusChange?: (payment: PaymentPayload) => void;
  onError?: (error: Error) => void;
}
