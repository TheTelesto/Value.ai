'use client'

import { useState } from 'react'
import { Plan } from '@/types'
import { ProviderBadge } from '@/components/shared/ProviderBadge'
import { UseCaseTag } from '@/components/shared/UseCaseTag'

export function PlanCard({ plan }: { plan: Plan }) {
  const [flipped, setFlipped] = useState(false)

  const faceStyle: React.CSSProperties = {
    gridArea: '1 / 1',
    borderRadius: 'var(--r-3)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  }

  return (
    <div
      style={{
        perspective: '1000px',
        cursor: 'pointer',
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        style={{
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          display: 'grid',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}
      >
        {/* Front */}
        <div
          style={{
            ...faceStyle,
            background: 'var(--bg-2)',
            border: '1px solid var(--line-2)',
            transition: 'all 220ms var(--ease-out)',
          }}
          onMouseEnter={e => {
            if (!flipped) {
              e.currentTarget.style.background = 'var(--bg-3)';
              e.currentTarget.style.borderColor = 'var(--line-3)';
              e.currentTarget.style.boxShadow = 'var(--shadow-2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={e => {
            if (!flipped) {
              e.currentTarget.style.background = 'var(--bg-2)';
              e.currentTarget.style.borderColor = 'var(--line-2)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }
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
          style={{
            ...faceStyle,
            background: 'var(--bg-3)',
            border: '1px solid var(--line-2)',
            transform: 'rotateY(180deg)',
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
