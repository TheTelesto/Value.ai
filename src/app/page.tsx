import { NavCard } from '@/components/home/NavCard'

const sections = [
  {
    icon: '💰',
    title: 'Compare Pricing',
    subtitle: 'Side-by-side plan comparison across all major AI providers. Find the best value for your tier.',
    href: '/pricing',
    gradient: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
  },
  {
    icon: '🤖',
    title: 'Explore Models',
    subtitle: 'Benchmarks, context windows, and capabilities for every major AI model in one place.',
    href: '/models',
    gradient: 'linear-gradient(135deg, #f0f9ff, #dbeafe)',
  },
  {
    icon: '🆓',
    title: 'Free & Open Source',
    subtitle: 'The best free and self-hostable models. No subscription required.',
    href: '/models/free',
    gradient: 'linear-gradient(135deg, #fdf4ff, #ede9fe)',
  },
  {
    icon: '🎯',
    title: 'Find Your Plan',
    subtitle: 'Answer a few questions and get a personalised AI recommendation with reasoning.',
    href: '/use-case',
    gradient: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
  },
]

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16 flex-1">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Find the right AI for you
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Compare subscriptions, models, and benchmarks across every major AI provider.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {sections.map(s => (
          <NavCard key={s.href} {...s} />
        ))}
      </div>
    </main>
  )
}
