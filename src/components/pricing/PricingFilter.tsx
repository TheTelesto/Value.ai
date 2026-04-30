'use client'

type Props = {
  tags: string[]
  selected: string | null
  onChange: (tag: string | null) => void
}

export function PricingFilter({ tags, selected, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '4px' }}>FILTER</span>
      {['All', ...tags].map(tag => {
        const isSelected = tag === 'All' ? selected === null : selected === tag
        return (
          <button
            key={tag}
            onClick={() => onChange(tag === 'All' ? null : tag)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: isSelected ? 'var(--fg-1)' : 'var(--fg-3)',
              background: isSelected ? 'var(--bg-3)' : 'transparent',
              border: `1px solid ${isSelected ? 'var(--line-3)' : 'var(--line-1)'}`,
              padding: '5px 12px', borderRadius: 'var(--r-3)', cursor: 'pointer',
              transition: 'all 150ms',
            }}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
