// Nav.jsx — ValueAI top navigation
const { useState } = React;

const Nav = ({ page, setPage }) => {
  const links = ['Compare', 'Models', 'Blog', 'Changelog'];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(5,7,11,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--line-1)',
    }}>
      <div style={{
        maxWidth: 'var(--max-w)', margin: '0 auto',
        padding: '0 var(--gutter)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '56px',
      }}>
        {/* Logo */}
        <button onClick={() => setPage('home')} style={{
          display: 'flex', alignItems: 'center', gap: '1px',
          fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600,
          cursor: 'pointer', background: 'none', border: 'none',
        }}>
          <span style={{ color: 'var(--electric)' }}>[</span>
          <span style={{ color: 'var(--fg-1)', letterSpacing: '-0.02em' }}>value</span>
          <span style={{ color: 'var(--cyan)', letterSpacing: '-0.02em' }}>ai</span>
          <span style={{ color: 'var(--electric)' }}>]</span>
          <span style={{
            display: 'inline-block', width: '10px', height: '16px',
            background: 'var(--cyan)', marginLeft: '4px',
            animation: 'blink 1.1s step-end infinite',
          }}></span>
        </button>

        {/* Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {links.map(l => (
            <button key={l} onClick={() => setPage(l.toLowerCase())} style={{
              fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
              color: page === l.toLowerCase() ? 'var(--fg-1)' : 'var(--fg-3)',
              padding: '6px 12px', borderRadius: 'var(--r-3)',
              background: page === l.toLowerCase() ? 'var(--bg-3)' : 'transparent',
              transition: 'all 150ms',
            }}>{l}</button>
          ))}
          <button style={{
            marginLeft: '8px',
            background: 'var(--electric)', color: '#fff',
            fontSize: '13px', fontWeight: 600,
            padding: '7px 16px', borderRadius: 'var(--r-3)',
            transition: 'all var(--dur-base) var(--ease-out)',
          }}>Get started</button>
        </nav>
      </div>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </header>
  );
};

Object.assign(window, { Nav });
