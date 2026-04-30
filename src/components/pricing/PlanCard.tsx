'use client'

import { useState } from 'react'
import { Plan } from '@/types'
import { ProviderBadge } from '@/components/shared/ProviderBadge'
import { UseCaseTag } from '@/components/shared/UseCaseTag'

export function PlanCard({ plan }: { plan: Plan }) {
  const [flipped, setFlipped] = useState(false)
  const [hov, setHov] = useState(false)

  return (
    <div
      className="card-flip"
      style={{ cursor: 'pointer' }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className={`card-flip-inner${flipped ? ' flipped' : ''}`}
        style={{
          transform: flipped ? 'rotateY(180deg)' : hov ? 'translateY(-2px)' : 'none',
        }}
      >
        {/* Front */}
        <div
          className="card-face"
          style={{
            background: hov && !flipped ? 'var(--bg-3)' : 'var(--bg-2)',
            border: `1px solid ${hov && !flipped ? 'var(--line-3)' : 'var(--line-2)'}`,
            borderRadius: 'var(--r-3)',
            padding: '20px',
            transition: 'all 220ms var(--ease-out)',
            boxShadow: hov && !flipped ? 'var(--shadow-2)' : 'none',
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
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fg-4)', textAlign: 'center', marginTop: '12px' }}>
            CLICK TO FLIP
          </p>
        </div>

        {/* Back */}
        <div
          className="card-face card-back"
          style={{
            background: 'var(--bg-3)',
            border: '1px solid var(--line-2)',
            borderRadius: 'var(--r-3)',
            padding: '20px',
            display: 'flex', flexDirection: 'column',
            position: 'absolute', inset: 0,
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--electric)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            ABOUT THIS PLAN
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--fg-2)', lineHeight: 1.6, flex: 1 }}>
            {plan.description}
          </p>
          <div style={{ marginTop: '12px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              INCLUDED MODELS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {plan.models.map(m => (
                <span key={m} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: 'var(--fg-3)', border: '1px solid var(--line-2)', background: 'var(--bg-4)',
                  padding: '2px 8px', borderRadius: 'var(--r-2)',
                }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--fg-4)', textAlign: 'center', marginTop: '12px' }}>
            CLICK TO FLIP
          </p>
        </div>
      </div>
    </div>
  )
}
