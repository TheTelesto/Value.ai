import type { Metadata } from 'next'
import { Inter_Tight, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'ValueAI — AI Plan Intelligence',
  description: 'Compare capabilities, pricing, and real value across every major AI provider — updated as they change.',
}

const criticalCss = `
:root {
  --bg-0: #05070b; --bg-1: #0a0d14; --bg-2: #10141d; --bg-3: #161b27; --bg-4: #1f2533;
  --fg-1: #e8ecf4; --fg-2: #a8b0c0; --fg-3: #6b7488; --fg-4: #3e455a;
  --line-1: #1c2230; --line-2: #262d3d; --line-3: #3a4256;
  --electric: #4d7cff; --electric-hi: #7299ff; --electric-lo: #2a4fcc;
  --cyan: #5fd9ff; --ultra: #8a5cff;
  --good: #3ddc97; --warn: #ffb547; --bad: #ff5d6c;
  --value-5: #3ddc97; --value-4: #87dc5f; --value-3: #ffd042; --value-2: #ff8c42; --value-1: #ff5d6c;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --font-sans: "Inter Tight", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Instrument Serif", ui-serif, Georgia, serif;
  --lh-tight: .92; --lh-snug: 1.08; --lh-body: 1.5; --lh-loose: 1.7;
  --tr-display: -.02em; --tr-tight: -.01em; --tr-mono: 0; --tr-caps: .12em;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px; --sp-5: 24px; --sp-6: 32px; --sp-7: 48px; --sp-8: 64px; --sp-9: 96px;
  --r-1: 2px; --r-2: 4px; --r-3: 6px; --r-4: 10px; --r-pill: 999px;
  --t-mega: clamp(56px, 9vw, 144px); --t-display: clamp(40px, 6vw, 88px);
  --t-h1: clamp(32px, 4vw, 56px); --t-h2: clamp(24px, 2.6vw, 36px); --t-h3: 20px; --t-h4: 16px; --t-body: 15px; --t-small: 13px; --t-micro: 11px;
  --shadow-1: 0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.4);
  --shadow-2: 0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 24px rgba(0,0,0,0.5);
  --shadow-3: 0 1px 0 rgba(255,255,255,0.06) inset, 0 24px 60px rgba(0,0,0,0.6);
  --glow-electric: 0 0 0 1px var(--electric), 0 0 24px rgba(77,124,255,0.35);
  --glow-cyan: 0 0 0 1px var(--cyan), 0 0 32px rgba(95,217,255,0.4);
  --ease-out: cubic-bezier(.2, .7, .1, 1); --ease-spring: cubic-bezier(.34, 1.56, .64, 1);
  --dur-fast: .12s; --dur-base: .22s; --dur-slow: .42s;
  --max-w: 1280px; --gutter: 32px;
  --scanline: repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 3px);
}
body { background: var(--bg-0); color: var(--fg-1); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; margin: 0; min-height: 100vh; display: flex; flex-direction: column; }
body::after { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 9999; background: var(--scanline); opacity: 0.6; }
@keyframes blink { 0%, to { opacity: 1; } 50% { opacity: 0; } }
::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: var(--bg-1); } ::-webkit-scrollbar-thumb { background: var(--bg-4); border-radius: 3px; }
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
