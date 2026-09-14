'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { useState } from 'react'
import CheckoutModal from './CheckoutModal'

const packages = [
  {
    id: '1m',
    name: '1 Bulan',
    price: 15000,
    durationDays: 30,
    features: ['Bot anti delay', 'Bot on 24 jam', 'Bot fast respon', 'Bot banyak fitur', 'Bot menggunakan security', 'Bot menggunakan button new', 'Bot anti virus dan bug'],
    isPopular: false,
  },
  {
    id: '3m',
    name: '3 Bulan',
    price: 40000,
    durationDays: 90,
    features: ['Bot anti delay', 'Bot on 24 jam', 'Bot fast respon', 'Bot banyak fitur', 'Bot menggunakan security', 'Bot menggunakan button new', 'Bot anti virus dan bug'],
    isPopular: true,
  },
  {
    id: '1y',
    name: '1 Tahun',
    price: 120000,
    durationDays: 365,
    features: ['Bot anti delay', 'Bot on 24 jam', 'Bot fast respon', 'Bot banyak fitur', 'Bot menggunakan security', 'Bot menggunakan button new', 'Bot anti virus dan bug'],
    isPopular: false,
  }
]

export default function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  const handleCheckout = (pkg: any) => {
    setSelectedPackage(pkg)
    setIsModalOpen(true)
  }

  return (
    <section id="paket" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple/5 blur-[150px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl text-white mb-4">Paket Sewa Bot WhatsApp</h2>
          <p className="text-gray text-lg">Pilih paket sesuai kebutuhan Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl ${pkg.isPopular ? 'glass border-2 border-orange shadow-[0_0_40px_rgba(255,107,0,0.2)] md:scale-105' : 'glass border border-border'}`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange text-black text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} fill="black" /> POPULAR
                </div>
              )}

              <h3 className="font-display font-bold text-xl text-white mb-2">{pkg.name}</h3>
              <p className="text-gray text-sm mb-6">Harga:</p>
              
              <div className="mb-8">
                <span className="font-display font-black text-4xl text-white">Rp{pkg.price.toLocaleString('id-ID')}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={18} className="text-orange mt-0.5 shrink-0" />
                    <span className="text-sm text-gray">{f}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleCheckout(pkg)}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${pkg.isPopular ? 'bg-orange text-black hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] hover:scale-1.02' : 'glass border border-white/20 text-white hover:bg-white/10'}`}
              >
                Sewa Sekarang
              </button>
            </motion.div>
          ))}
        </div>

        {selectedPackage && (
          <CheckoutModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            pkg={selectedPackage} 
          />
        )}
      </div>
    </section>
  )
}
