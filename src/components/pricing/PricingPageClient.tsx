'use client'

import { useState } from 'react'
import { Plan } from '@/types'
import { PlanCard } from './PlanCard'
import { PricingFilter } from './PricingFilter'

type Props = { plans: Plan[]; allTags: string[] }

export function PricingPageClient({ plans, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const filtered = activeTag ? plans.filter(p => p.bestFor.includes(activeTag)) : plans

  return (
    <>
      <PricingFilter tags={allTags} selected={activeTag} onChange={setActiveTag} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px', marginTop: '24px' }}>
        {filtered.map(plan => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--fg-3)', textAlign: 'center', marginTop: '48px' }}>No plans match this filter.</p>
      )}
    </>
  )
}
