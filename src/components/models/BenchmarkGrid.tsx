import { Model } from '@/types'

export function BenchmarkGrid({ models }: { models: Model[] }) {
  const allBenchmarks = Array.from(
    new Set(
      models.flatMap(m =>
        Object.entries(m.benchmarks)
          .filter(([, v]) => v !== undefined)
          .map(([k]) => k)
      )
    )
  )

  const thStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
    color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em',
    padding: '10px 12px', textAlign: 'left', whiteSpace: 'nowrap',
    borderBottom: '1px solid var(--line-1)', background: 'var(--bg-1)',
    position: 'sticky', top: '56px',
  }

  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--line-1)', borderRadius: 'var(--r-3)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
        <thead>
          <tr>
            <th style={thStyle}>MODEL</th>
            {allBenchmarks.map(b => (
              <th key={b} style={{ ...thStyle, textAlign: 'right' }}>{b}</th>
            ))}
            <th style={{ ...thStyle, textAlign: 'right' }}>CONTEXT</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, i) => (
            <tr key={model.id} style={{
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
              borderTop: '1px solid var(--line-1)',
            }}>
              <td style={{ padding: '12px' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px', color: 'var(--fg-1)' }}>{model.name}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', marginTop: '2px' }}>{model.provider}</p>
              </td>
              {allBenchmarks.map(b => (
                <td key={b} style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--fg-2)', textAlign: 'right' }}>
                  {model.benchmarks[b] !== undefined ? `${model.benchmarks[b]}%` : '\u2014'}
                </td>
              ))}
              <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--cyan)', textAlign: 'right' }}>
                {(model.contextWindow / 1000).toFixed(0)}K
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
