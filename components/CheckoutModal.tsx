'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, CheckCircle2, Copy } from 'lucide-react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  pkg: any
}

export default function CheckoutModal({ isOpen, onClose, pkg }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form')
  const [groupLink, setGroupLink] = useState('')
  const [orderId] = useState(`AS-${Date.now()}`)
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<'loading' | 'pending' | 'paid' | 'error'>('loading')
  const [copied, setCopied] = useState(false)

  // Generate Payment when step is 'payment'
  useEffect(() => {
    if (step === 'payment' && !paymentUrl) {
      setStatus('loading')
      fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount: pkg.price })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPaymentUrl(data.data.payment_url)
            setStatus('pending')
          } else {
            setStatus('error')
          }
        })
        .catch(() => setStatus('error'))
    }
  }, [step, orderId, pkg.price, paymentUrl])

  // Polling status
  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch(`/api/payments/status?orderId=${orderId}&amount=${pkg.price}`)
      const data = await res.json()
      if (data.status === 'completed' || data.status === 'paid') {
        setStatus('paid')
        setTimeout(() => setStep('success'), 1000)
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }, [orderId, pkg.price])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (status === 'pending') {
      interval = setInterval(checkStatus, 3000)
    }
    return () => clearInterval(interval)
  }, [status, checkStatus])

  const handleCopyLink = () => {
    if (paymentUrl) {
      navigator.clipboard.writeText(paymentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    setStep('form')
    setPaymentUrl(null)
    setStatus('loading')
    setGroupLink('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="glass border border-border rounded-2xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray hover:text-white transition-colors">
              <X size={24} />
            </button>

            {step === 'form' && (
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Checkout {pkg.name}</h3>
                <p className="text-sm text-gray mb-6">Harga: Rp{pkg.price.toLocaleString('id-ID')}</p>
                
                <form onSubmit={(e) => { e.preventDefault(); setStep('payment') }} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray mb-2">Link Grup WhatsApp</label>
                    <input 
                      type="text"
                      value={groupLink}
                      onChange={(e) => setGroupLink(e.target.value)}
                      placeholder="https://chat.whatsapp.com/xxxxx"
                      className="w-full bg-dark-gray border border-border rounded-xl px-4 py-3 text-white focus:border-orange focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <button type="submit" className="w-full bg-orange text-black py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] transition-all">
                    Lanjut ke Pembayaran
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <>
                {status === 'loading' && (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader2 size={40} className="animate-spin text-orange" />
                    <p className="text-gray">Menyiapkan Pembayaran QRIS...</p>
                  </div>
                )}

                {status === 'pending' && paymentUrl && (
                  <div className="text-center">
                    <h3 className="font-display font-bold text-xl text-white mb-2">Scan QRIS Pembayaran</h3>
                    <p className="text-sm text-gray mb-6">Scan kode QR di bawah ini menggunakan aplikasi e-wallet/m-banking apapun.</p>
                    
                    <div className="bg-white p-4 rounded-xl mb-6 aspect-square flex items-center justify-center">
                      <a href={paymentUrl} target="_blank" rel="noopener noreferrer" className="text-black font-bold text-center break-all text-sm hover:text-orange">
                        Klik untuk Membuka QRIS
                      </a>
                    </div>

                    <button 
                      onClick={handleCopyLink}
                      className="w-full glass border border-border text-white py-3 rounded-xl font-semibold mb-4 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                    >
                      {copied ? <CheckCircle2 size={18} className="text-orange" /> : <Copy size={18} />}
                      {copied ? 'Tautan Disalin!' : 'Salin Tautan Bayar'}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Menunggu pembayaran...</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="w-20 h-20 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 size={40} className="text-orange" />
                </motion.div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">Pembayaran Berhasil!</h3>
                <p className="text-gray mb-6">Bot WhatsApp Anda sedang disiapkan dan akan masuk ke grup dalam beberapa detik.</p>
                <button onClick={handleClose} className="bg-orange text-black px-6 py-3 rounded-xl font-bold w-full hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] transition-all">
                  Selesai
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
