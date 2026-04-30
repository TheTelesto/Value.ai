import { Recommendation } from '@/types'

type Props = {
  result: Recommendation | null
  onReset: () => void
}

export function ResultCard({ result, onReset }: Props) {
  if (!result) {
    return (
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--fg-3)', marginBottom: '16px' }}>
          We couldn&apos;t find a perfect match &mdash; explore our{' '}
          <a href="/pricing" style={{ color: 'var(--electric)', textDecoration: 'underline' }}>
            pricing page
          </a>{' '}
          for all options.
        </p>
        <button
          onClick={onReset}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--electric)',
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          Start over
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      <div style={{
        background: 'var(--bg-2)',
        border: '1px solid var(--line-2)',
        borderRadius: 'var(--r-3)',
        padding: '32px',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'var(--good)', textTransform: 'uppercase',
          letterSpacing: '0.1em', marginBottom: '8px',
        }}>
          BEST VALUE FOR YOU
        </p>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '28px',
          letterSpacing: '-0.015em', color: 'var(--fg-1)', marginBottom: '16px',
        }}>
          {result.recommendedPlan}
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--fg-2)', lineHeight: 1.7, marginBottom: '24px' }}>
          {result.reasoning}
        </p>
        {result.alternatives.length > 0 && (
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
              ALSO CONSIDER
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {result.alternatives.map(alt => (
                <span key={alt} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  color: 'var(--fg-3)', border: '1px solid var(--line-2)',
                  padding: '4px 10px', borderRadius: 'var(--r-pill)',
                }}>
                  {alt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onReset}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--electric)',
          background: 'none', border: 'none', cursor: 'pointer',
          marginTop: '16px',
        }}
      >
        Start over
      </button>
    </div>
  )
}
