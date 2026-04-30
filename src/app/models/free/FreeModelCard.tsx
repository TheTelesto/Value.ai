'use client'

import { useState } from 'react'
import { FreeModel } from '@/types'
import { UseCaseTag } from '@/components/shared/UseCaseTag'
import { BenchmarkBar } from '@/components/shared/BenchmarkBar'

const difficultyLabel: Record<string, string> = {
  easy: 'EASY',
  medium: 'MEDIUM',
  hard: 'HARD',
}

const difficultyColor: Record<string, string> = {
  easy: 'var(--good)',
  medium: 'var(--warn)',
  hard: 'var(--bad)',
}

export function FreeModelCard({ model }: { model: FreeModel }) {
  const [hov, setHov] = useState(false)
  const benchmarkEntries = Object.entries(model.benchmarks).filter(
    (entry): entry is [string, number] => entry[1] !== undefined
  )

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
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px', color: 'var(--fg-1)' }}>{model.name}</h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', marginTop: '2px' }}>{model.provider} &middot; {model.parameters}</p>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'var(--cyan)', background: 'rgba(95,217,255,0.1)',
          border: '1px solid rgba(95,217,255,0.25)',
          padding: '2px 8px', borderRadius: 'var(--r-pill)',
          whiteSpace: 'nowrap',
        }}>
          {(model.contextWindow / 1000).toFixed(0)}K ctx
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: difficultyColor[model.selfHostDifficulty],
          border: `1px solid ${difficultyColor[model.selfHostDifficulty]}40`,
          background: `${difficultyColor[model.selfHostDifficulty]}15`,
          padding: '2px 8px', borderRadius: 'var(--r-pill)',
        }}>
          {difficultyLabel[model.selfHostDifficulty]} TO HOST
        </span>
        {model.minVram && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'var(--fg-3)', border: '1px solid var(--line-2)',
            padding: '2px 8px', borderRadius: 'var(--r-pill)',
          }}>
            {model.minVram} VRAM
          </span>
        )}
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'var(--good)', border: '1px solid rgba(61,220,151,0.3)',
          padding: '2px 8px', borderRadius: 'var(--r-pill)',
        }}>
          {model.license}
        </span>
      </div>

      {benchmarkEntries.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          {benchmarkEntries.map(([key, val]) => (
            <BenchmarkBar key={key} label={key.toUpperCase()} score={val} />
          ))}
        </div>
      )}

      <div style={{ marginBottom: '12px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>RUN WITH</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {model.hostingOptions.map(h => (
            <span key={h} style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: 'var(--fg-3)', border: '1px solid var(--line-2)', background: 'var(--bg-4)',
              padding: '2px 8px', borderRadius: 'var(--r-2)',
            }}>
              {h}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {model.bestFor.map(tag => (
          <UseCaseTag key={tag} label={tag} />
        ))}
      </div>
    </div>
  )
}
