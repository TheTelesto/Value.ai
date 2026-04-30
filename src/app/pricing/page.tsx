import { plans } from '@/data/plans'
import { PricingPageClient } from '@/components/pricing/PricingPageClient'

export const metadata = {
  title: 'AI Plan Comparison — ValueAI',
  description: 'Compare AI subscription plans across all major providers. Filter and rank by value.',
}

export default function PricingPage() {
  const allTags = Array.from(new Set(plans.flatMap(p => p.bestFor))).sort()
  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px var(--gutter) 80px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>AI PLAN COMPARISON</div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.02em', color: 'var(--fg-1)', marginBottom: '8px' }}>
            Find your best AI subscription
          </h1>
          <p style={{ color: 'var(--fg-3)', fontSize: '15px' }}>
            {plans.length} plans across all major providers, ranked by value.
          </p>
        </div>
        <PricingPageClient plans={plans} allTags={allTags} />
      </div>
    </div>
  )
}
