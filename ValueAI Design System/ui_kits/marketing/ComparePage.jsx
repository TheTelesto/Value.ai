// ComparePage.jsx — AI plan comparison table
const { useState } = React;

const MODELS_DATA = [
  { model: 'Claude Sonnet 4',    provider: 'Anthropic', price: 20,  ctx: '200k', per1m_in: 3,    per1m_out: 15,   vision: true,  code: true,  reasoning: false, value: 5, tag: 'BEST VALUE',  tagColor: 'var(--good)' },
  { model: 'Claude Haiku 3.5',   provider: 'Anthropic', price: 0,   ctx: '200k', per1m_in: 0.8,  per1m_out: 4,    vision: true,  code: true,  reasoning: false, value: 5, tag: 'FREE',        tagColor: 'var(--good)' },
  { model: 'Claude Opus 4',      provider: 'Anthropic', price: 100, ctx: '200k', per1m_in: 15,   per1m_out: 75,   vision: true,  code: true,  reasoning: true,  value: 2, tag: 'PREMIUM',     tagColor: 'var(--warn)' },
  { model: 'GPT-4o',             provider: 'OpenAI',    price: 20,  ctx: '128k', per1m_in: 5,    per1m_out: 15,   vision: true,  code: true,  reasoning: false, value: 3, tag: 'POPULAR',     tagColor: 'var(--electric)' },
  { model: 'GPT-4.1 mini',       provider: 'OpenAI',    price: 0,   ctx: '32k',  per1m_in: 0.15, per1m_out: 0.6,  vision: false, code: true,  reasoning: false, value: 4, tag: 'FREE TIER',   tagColor: 'var(--ultra)' },
  { model: 'o3',                 provider: 'OpenAI',    price: 20,  ctx: '200k', per1m_in: 10,   per1m_out: 40,   vision: false, code: true,  reasoning: true,  value: 3, tag: 'REASONING',   tagColor: 'var(--ultra)' },
  { model: 'Gemini 2.0 Pro',     provider: 'Google',    price: 20,  ctx: '1M',   per1m_in: 3.5,  per1m_out: 10.5, vision: true,  code: true,  reasoning: false, value: 4, tag: 'LONG CTX',    tagColor: 'var(--cyan)' },
  { model: 'Gemini 2.0 Flash',   provider: 'Google',    price: 0,   ctx: '1M',   per1m_in: 0.1,  per1m_out: 0.4,  vision: true,  code: true,  reasoning: false, value: 5, tag: 'BEST FREE',   tagColor: 'var(--good)' },
  { model: 'Grok 3',             provider: 'xAI',       price: 30,  ctx: '128k', per1m_in: 3,    per1m_out: 15,   vision: true,  code: true,  reasoning: true,  value: 3, tag: 'NEW',         tagColor: 'var(--electric)' },
  { model: 'Llama 3.3 70B',      provider: 'Meta',      price: 0,   ctx: '128k', per1m_in: 0.23, per1m_out: 0.92, vision: false, code: true,  reasoning: false, value: 5, tag: 'OPEN SOURCE', tagColor: 'var(--cyan)' },
  { model: 'Mistral Large 2',    provider: 'Mistral',   price: 0,   ctx: '128k', per1m_in: 2,    per1m_out: 6,    vision: false, code: true,  reasoning: false, value: 4, tag: 'EU DATA',     tagColor: 'var(--ultra)' },
];

const VALUE_COLORS = ['#ff5d6c','#ff8c42','#ffd042','#87dc5f','#3ddc97'];
const PROVIDERS = ['All', 'Anthropic', 'OpenAI', 'Google', 'xAI', 'Meta', 'Mistral'];

const Check = ({ v }) => (
  <span style={{
    fontFamily: 'var(--font-mono)', fontSize: '14px',
    color: v ? 'var(--good)' : 'var(--fg-4)',
  }}>{v ? '✓' : '—'}</span>
);

const ValueBar = ({ v }) => (
  <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
    {[1,2,3,4,5].map(i => (
      <div key={i} style={{
        width: '12px', height: '4px', borderRadius: '2px',
        background: i <= v ? VALUE_COLORS[v - 1] : 'var(--bg-4)',
      }}></div>
    ))}
  </div>
);

const ComparePage = ({ setPage }) => {
  const [provider, setProvider] = useState('All');
  const [sortBy, setSortBy] = useState('value');
  const [selected, setSelected] = useState(new Set());

  const filtered = MODELS_DATA
    .filter(m => provider === 'All' || m.provider === provider)
    .sort((a, b) => sortBy === 'value' ? b.value - a.value : sortBy === 'price' ? a.price - b.price : 0);

  const toggleSelect = id => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.size < 4 && s.add(id);
    setSelected(s);
  };

  const thStyle = {
    fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
    color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em',
    padding: '10px 12px', textAlign: 'left', whiteSpace: 'nowrap',
    borderBottom: '1px solid var(--line-1)', background: 'var(--bg-1)',
    position: 'sticky', top: '56px',
  };

  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px var(--gutter) 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>AI PLAN COMPARISON</div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.02em', color: 'var(--fg-1)', marginBottom: '8px' }}>
            Find your best AI subscription
          </h1>
          <p style={{ color: 'var(--fg-3)', fontSize: '15px' }}>
            {MODELS_DATA.length} models across {PROVIDERS.length - 1} providers, ranked by value.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '4px' }}>PROVIDER</span>
          {PROVIDERS.map(p => (
            <button key={p} onClick={() => setProvider(p)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: provider === p ? 'var(--fg-1)' : 'var(--fg-3)',
              background: provider === p ? 'var(--bg-3)' : 'transparent',
              border: `1px solid ${provider === p ? 'var(--line-3)' : 'var(--line-1)'}`,
              padding: '5px 12px', borderRadius: 'var(--r-3)', cursor: 'pointer',
            }}>{p}</button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SORT</span>
            {['value', 'price'].map(s => (
              <button key={s} onClick={() => setSortBy(s)} style={{
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: sortBy === s ? 'var(--electric)' : 'var(--fg-3)',
                background: 'transparent', border: 'none', cursor: 'pointer',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                borderBottom: sortBy === s ? '1px solid var(--electric)' : '1px solid transparent',
              }}>{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', border: '1px solid var(--line-1)', borderRadius: 'var(--r-3)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: '24px' }}></th>
                <th style={thStyle}>MODEL</th>
                <th style={thStyle}>PROVIDER</th>
                <th style={thStyle}>PLAN PRICE</th>
                <th style={thStyle}>API $/1M IN</th>
                <th style={thStyle}>CONTEXT</th>
                <th style={thStyle}>VISION</th>
                <th style={thStyle}>CODE</th>
                <th style={thStyle}>REASONING</th>
                <th style={thStyle}>VALUE</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => {
                const isSelected = selected.has(m.model);
                return (
                  <tr key={m.model} style={{
                    background: isSelected ? 'rgba(77,124,255,0.06)' : i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                    borderTop: '1px solid var(--line-1)',
                    transition: 'background 150ms',
                  }}>
                    <td style={{ padding: '12px 12px 12px 16px' }}>
                      <div onClick={() => toggleSelect(m.model)} style={{
                        width: '16px', height: '16px', borderRadius: '3px',
                        border: `1px solid ${isSelected ? 'var(--electric)' : 'var(--line-2)'}`,
                        background: isSelected ? 'var(--electric)' : 'transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isSelected && <span style={{ color: '#fff', fontSize: '10px', lineHeight: 1 }}>✓</span>}
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button onClick={() => setPage('model')} style={{
                          fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px',
                          color: 'var(--fg-1)', background: 'none', border: 'none', cursor: 'pointer',
                          textAlign: 'left',
                        }}>{m.model}</button>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '10px',
                          color: m.tagColor, background: `${m.tagColor}18`,
                          border: `1px solid ${m.tagColor}40`,
                          padding: '1px 6px', borderRadius: 'var(--r-pill)',
                        }}>{m.tag}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-3)' }}>{m.provider}</td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: 'var(--fg-1)' }}>
                      {m.price === 0 ? <span style={{ color: 'var(--good)' }}>Free</span> : `$${m.price}/mo`}
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--fg-2)' }}>${m.per1m_in}</td>
                    <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--cyan)' }}>{m.ctx}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}><Check v={m.vision} /></td>
                    <td style={{ padding: '12px', textAlign: 'center' }}><Check v={m.code} /></td>
                    <td style={{ padding: '12px', textAlign: 'center' }}><Check v={m.reasoning} /></td>
                    <td style={{ padding: '12px' }}><ValueBar v={m.value} /></td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => setPage('model')} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--electric)',
                        background: 'none', border: '1px solid rgba(77,124,255,0.25)',
                        padding: '4px 10px', borderRadius: 'var(--r-2)', cursor: 'pointer',
                      }}>Details</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)' }}>
          Select up to 4 models to compare side-by-side. Data updated daily.
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ComparePage });
