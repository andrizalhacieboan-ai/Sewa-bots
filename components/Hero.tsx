'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Zap, ArrowRight } from 'lucide-react'

const Robot3D = dynamic(() => import('./Robot3D'), { ssr: false })

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-orange/5 rounded-full blur-[150px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-border rounded-full px-4 py-1.5 mb-6">
            <Zap size={14} className="text-orange" />
            <span className="text-xs font-medium text-white">Solusi Terbaik Untuk Bisnis & Komunitas</span>
          </div>

          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-6">
            Sewa Bot <br />
            <span className="text-orange">WhatsApp</span> Premium
          </h1>

          <p className="text-gray text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8">
            Bot WhatsApp siap digunakan dengan fitur lengkap, performa cepat, keamanan terjamin, dan support 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => alert('Aplikasi Mobile Segera Hadir!')}
              className="bg-orange text-black px-6 py-3 rounded-xl font-bold text-base hover:shadow-[0_0_30px_rgba(255,107,0,0.6)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Download Sekarang <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => document.getElementById('paket')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white/10 transition-all duration-300"
            >
              Lihat Paket
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-3">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-dark-gray border-2 border-black"></div>
              ))}
            </div>
            <p className="text-xs text-gray">10.000+ pengguna telah mempercayai ANDRI STORE</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[400px] md:h-[600px]"
        >
          <motion.div 
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-0 glass p-3 rounded-xl z-20 hidden md:block"
          >
            <p className="text-orange text-xs font-bold">🟢 ONLINE</p>
            <p className="text-white text-sm font-bold">Bot WhatsApp</p>
            <p className="text-gray text-xs">99.9% Uptime</p>
          </motion.div>
          
          <Robot3D />
        </motion.div>
      </div>
    </section>
  )
}
