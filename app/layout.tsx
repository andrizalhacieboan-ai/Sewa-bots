import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: 'ANDRI STORE BOT — Sewa Bot WhatsApp Premium',
  description: 'Sewa Bot WhatsApp premium untuk bisnis, komunitas dan kebutuhan pribadi dengan fitur lengkap dan support 24/7.',
  openGraph: {
    title: 'ANDRI STORE BOT — Sewa Bot WhatsApp Premium',
    description: 'Solusi Terbaik Untuk Bisnis & Komunitas. Cepat, Aman, Terpercaya.',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans bg-black text-gray antialiased">
        {children}
      </body>
    </html>
  )
}
