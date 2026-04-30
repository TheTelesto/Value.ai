import { plans } from '@/data/plans'
import { PricingPageClient } from '@/components/pricing/PricingPageClient'

export const metadata = {
  title: 'AI Pricing Plans — AI Value',
  description: 'Compare AI subscription plans across all major providers. Filter by use case to find the best value.',
}

export default function PricingPage() {
  const allTags = Array.from(new Set(plans.flatMap(p => p.bestFor))).sort()
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 flex-1">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Pricing Plans</h1>
      <p className="text-xl text-gray-500 mb-10">
        Compare plans across all major AI providers. Filter by what you need it for.
      </p>
      <PricingPageClient plans={plans} allTags={allTags} />
    </main>
  )
}
