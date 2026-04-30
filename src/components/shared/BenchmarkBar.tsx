type Props = { label: string; score: number; maxScore?: number }

export function BenchmarkBar({ label, score, maxScore = 100 }: Props) {
  const pct = Math.min(Math.round((score / maxScore) * 100), 100)
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--fg-2)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-4)' }}>{score}%</span>
      </div>
      <div style={{ height: '4px', background: 'var(--bg-4)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: 'linear-gradient(90deg, var(--electric), var(--cyan))',
          borderRadius: '2px',
        }} />
      </div>
    </div>
  )
}
