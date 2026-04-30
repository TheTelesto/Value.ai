'use client'

import { useState } from 'react'
import { Plan } from '@/types'
import { ProviderBadge } from '@/components/shared/ProviderBadge'
import { UseCaseTag } from '@/components/shared/UseCaseTag'

export function PlanCard({ plan }: { plan: Plan }) {
  const [hov, setHov] = useState(false)

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--bg-3)' : 'var(--bg-2)',
        border: `1px solid ${hov ? 'var(--line-3)' : 'var(--line-2)'}`,
        borderRadius: 'var(--r-3)',
        padding: '20px',
        transition: 'all 220ms var(--ease-out)',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? 'var(--shadow-2)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <ProviderBadge name={plan.provider} color={plan.accentColor} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '18px', color: 'var(--fg-1)', marginBottom: '8px' }}>{plan.name}</h3>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: 'var(--fg-1)' }}>
        {plan.price === 0 ? 'Free' : `$${plan.price}`}
        {plan.price > 0 && <span style={{ fontSize: '13px', color: 'var(--fg-4)', fontWeight: 400 }}>/mo</span>}
      </div>
      {plan.pricingNote && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-4)', marginTop: '2px' }}>{plan.pricingNote}</p>
      )}
      <ul style={{ marginTop: '16px', flex: 1, listStyle: 'none', padding: 0 }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--fg-2)' }}>
            <span style={{ color: 'var(--good)', fontFamily: 'var(--font-mono)', fontSize: '12px', flexShrink: 0 }}>&#10003;</span>
            {f}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '16px' }}>
        {plan.bestFor.map(tag => (
          <UseCaseTag key={tag} label={tag} />
        ))}
      </div>
    </div>
  )
}
