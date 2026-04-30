import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent"
        >
          AI Value
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/pricing" className="hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link href="/models" className="hover:text-gray-900 transition-colors">
            Models
          </Link>
          <Link href="/use-case" className="hover:text-gray-900 transition-colors">
            Find My Plan
          </Link>
        </nav>
      </div>
    </header>
  )
}
