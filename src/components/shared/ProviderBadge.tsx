type Props = { name: string; color: string }

export function ProviderBadge({ name, color }: Props) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '4px 12px', borderRadius: 'var(--r-pill)',
      border: '1px solid var(--line-2)', background: 'var(--bg-2)',
      fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-2)',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, display: 'inline-block' }} />
      {name}
    </div>
  )
}
