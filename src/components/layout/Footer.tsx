export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--line-1)', marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: 'var(--max-w)', margin: '0 auto',
        padding: '24px var(--gutter)',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)' }}>
          ValueAI — independent AI plan intelligence. Data updated daily.
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-4)', marginTop: '4px' }}>
          Prices and capabilities change frequently. Always verify before subscribing.
        </p>
      </div>
    </footer>
  )
}
