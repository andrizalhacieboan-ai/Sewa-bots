'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Home', 'Paket', 'Fitur', 'Cara Order', 'FAQ']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-border py-3' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange rounded-md flex items-center justify-center font-display font-black text-black">A</div>
          <span className="font-display font-bold text-white text-lg tracking-wider">ANDRI STORE BOT</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray hover:text-white transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm text-white hover:text-orange transition-colors">Login</button>
          <button className="bg-orange text-black px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] transition-all">
            Daftar
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border mt-3"
          >
            <div className="flex flex-col p-4 gap-4">
              {links.map((l) => (
                <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="text-gray hover:text-white" onClick={() => setOpen(false)}>
                  {l}
                </a>
              ))}
              <button className="bg-orange text-black px-4 py-2 rounded-lg font-semibold text-sm mt-2">Daftar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
