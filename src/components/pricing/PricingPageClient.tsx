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
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(plan => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No plans match this filter.</p>
      )}
    </>
  )
}
