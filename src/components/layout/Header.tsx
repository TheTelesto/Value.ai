'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = ['Pricing', 'Models', 'Use case']

export function Header() {
  const pathname = usePathname()
  const page = (
    pathname === '/' ? 'home' :
    pathname.startsWith('/pricing') ? 'pricing' :
    pathname.startsWith('/models') ? 'models' :
    pathname.startsWith('/use-case') ? 'use case' : ''
  )

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(5,7,11,0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--line-1)',
    }}>
      <div style={{
        maxWidth: 'var(--max-w)', margin: '0 auto',
        padding: '0 var(--gutter)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '56px',
      }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: '1px',
          fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600,
        }}>
          <span style={{ color: 'var(--electric)' }}>[</span>
          <span style={{ color: 'var(--fg-1)', letterSpacing: '-0.02em' }}>value</span>
          <span style={{ color: 'var(--cyan)', letterSpacing: '-0.02em' }}>ai</span>
          <span style={{ color: 'var(--electric)' }}>]</span>
          <span style={{
            display: 'inline-block', width: '10px', height: '16px',
            background: 'var(--cyan)', marginLeft: '4px',
            animation: 'blink 1.1s step-end infinite',
          }} />
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {links.map(l => {
            const href = l === 'Use case' ? '/use-case' : `/${l.toLowerCase()}`
            const isActive = page === l.toLowerCase()
            return (
              <Link key={l} href={href} style={{
                fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
                color: isActive ? 'var(--fg-1)' : 'var(--fg-3)',
                padding: '6px 12px', borderRadius: 'var(--r-3)',
                background: isActive ? 'var(--bg-3)' : 'transparent',
                transition: 'all 150ms',
              }}>{l}</Link>
            )
          })}
          <Link href="/use-case" style={{
            marginLeft: '8px',
            background: 'var(--electric)', color: '#fff',
            fontSize: '13px', fontWeight: 600,
            padding: '7px 16px', borderRadius: 'var(--r-3)',
            transition: 'all var(--dur-base) var(--ease-out)',
          }}>Get started</Link>
        </nav>
      </div>
    </header>
  )
}
