import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Value — Compare AI Subscriptions & Models',
  description: 'Find the best AI subscription for your needs. Compare pricing, models, and benchmarks across all major AI providers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
