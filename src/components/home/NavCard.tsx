import Link from 'next/link'

type Props = {
  icon: string
  title: string
  subtitle: string
  href: string
  gradient: string
}

export function NavCard({ icon, title, subtitle, href, gradient }: Props) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      style={{ background: gradient }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors">
        {title}
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed">{subtitle}</p>
    </Link>
  )
}
