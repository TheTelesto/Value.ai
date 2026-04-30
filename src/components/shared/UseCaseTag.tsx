type Props = { label: string }

export function UseCaseTag({ label }: Props) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
      color: 'var(--fg-3)',
      border: '1px solid var(--line-2)',
      padding: '2px 8px', borderRadius: 'var(--r-pill)',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}
