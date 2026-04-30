// HomePage.jsx — ValueAI landing page
const { useState, useEffect } = React;

const PROVIDERS = [
  { name: 'Anthropic', color: '#e88b5a' },
  { name: 'OpenAI',    color: '#74a99c' },
  { name: 'Google',    color: '#7299ff' },
  { name: 'Meta',      color: '#5ca8ff' },
  { name: 'Mistral',   color: '#8a5cff' },
  { name: 'xAI',       color: '#a8b0c0' },
];

const TOP_MODELS = [
  { model: 'Claude Sonnet 4', provider: 'Anthropic', price: '$20', value: 5, tag: 'BEST VALUE',  tagColor: 'var(--good)',     ctx: '200k', per1m: '$3' },
  { model: 'GPT-4o',          provider: 'OpenAI',    price: '$20', value: 3, tag: 'POPULAR',    tagColor: 'var(--electric)', ctx: '128k', per1m: '$5' },
  { model: 'Gemini 2.0 Pro',  provider: 'Google',    price: '$20', value: 4, tag: 'MULTIMODAL', tagColor: 'var(--cyan)',     ctx: '1M',   per1m: '$3.5' },
  { model: 'GPT-4.1 mini',    provider: 'OpenAI',    price: '$0',  value: 5, tag: 'FREE TIER',  tagColor: 'var(--ultra)',    ctx: '32k',  per1m: '$0.15' },
];

const VALUE_COLORS = ['#ff5d6c','#ff8c42','#ffd042','#87dc5f','#3ddc97'];

const ModelCard = ({ model, provider, price, value, tag, tagColor, ctx, per1m, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: hov ? 'var(--bg-3)' : 'var(--bg-2)',
        border: `1px solid ${hov ? 'var(--line-3)' : 'var(--line-2)'}`,
        borderRadius: 'var(--r-3)',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 220ms var(--ease-out)',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? 'var(--shadow-2)' : 'none',
        flex: '1 1 200px',
        minWidth: '200px',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px', color: 'var(--fg-1)' }}>{model}</div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
          color: tagColor, background: `${tagColor}20`,
          border: `1px solid ${tagColor}50`,
          padding: '2px 8px', borderRadius: 'var(--r-pill)',
          whiteSpace: 'nowrap',
        }}>{tag}</span>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-4)' }}>{provider}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-3)' }}>{ctx} ctx</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-3)' }}>{per1m}/1M tok</span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700, color: 'var(--fg-1)' }}>
        {price}<span style={{ fontSize: '13px', color: 'var(--fg-4)', fontWeight: 400 }}>/mo</span>
      </div>
      <div style={{ display: 'flex', gap: '3px', marginTop: '10px' }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            flex: 1, height: '5px', borderRadius: '2px',
            background: i <= value ? VALUE_COLORS[value - 1] : 'var(--bg-4)',
            transition: 'background 300ms',
          }}></div>
        ))}
      </div>
    </div>
  );
};

const ProviderPill = ({ name, color }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '6px 14px', borderRadius: 'var(--r-pill)',
    border: '1px solid var(--line-2)', background: 'var(--bg-2)',
    fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--fg-2)',
  }}>
    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, display: 'inline-block' }}></span>
    {name}
  </div>
);

const HomePage = ({ setPage }) => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ paddingTop: '56px' }}>
      {/* Hero */}
      <section style={{
        minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px var(--gutter) 60px',
        maxWidth: 'var(--max-w)', margin: '0 auto',
        position: 'relative',
      }}>
        {/* bg glow */}
        <div style={{
          position: 'absolute', top: '10%', left: '-5%', width: '50%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(77,124,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}></div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px' }}>
          [ REAL-TIME AI PLAN INTELLIGENCE · {tick % 2 === 0 ? '47 MODELS TRACKED' : 'UPDATED DAILY'} ]
        </div>

        <h1 style={{
          fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(48px,7vw,100px)',
          lineHeight: 0.92, letterSpacing: '-0.03em', color: 'var(--fg-1)',
          marginBottom: '12px', position: 'relative',
        }}>
          Every model.<br />
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-2)' }}>One clear</span><br />
          verdict.
        </h1>

        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: 'var(--fg-3)', lineHeight: 1.6, maxWidth: '500px', marginTop: '20px', marginBottom: '32px' }}>
          Compare capabilities, pricing, and real value across every major AI provider — updated as they change.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => setPage('compare')} style={{
            background: 'var(--electric)', color: '#fff',
            fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px',
            padding: '12px 28px', borderRadius: 'var(--r-3)',
            border: 'none', cursor: 'pointer',
            transition: 'all 220ms var(--ease-out)',
          }}>Compare plans →</button>
          <button onClick={() => setPage('models')} style={{
            background: 'var(--bg-2)', color: 'var(--fg-1)',
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '15px',
            padding: '12px 24px', borderRadius: 'var(--r-3)',
            border: '1px solid var(--line-2)', cursor: 'pointer',
          }}>Browse models</button>
        </div>

        {/* provider pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '40px' }}>
          {PROVIDERS.map((p, i) => <ProviderPill key={p.name || i} {...p} />)}
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--line-1)', maxWidth: 'var(--max-w)', margin: '0 auto var(--gutter)' }}></div>

      {/* Top picks */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter) 80px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '6px' }}>TODAY'S TOP PICKS</div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '26px', letterSpacing: '-0.015em', color: 'var(--fg-1)' }}>Best value by subscription tier</h2>
          </div>
          <button onClick={() => setPage('compare')} style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--electric)',
            background: 'none', border: '1px solid rgba(77,124,255,0.3)',
            padding: '6px 14px', borderRadius: 'var(--r-3)', cursor: 'pointer',
          }}>Full comparison →</button>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {TOP_MODELS.map(m => (
            <ModelCard key={m.model} {...m} onClick={() => setPage('model')} />
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ borderTop: '1px solid var(--line-1)', borderBottom: '1px solid var(--line-1)', background: 'var(--bg-1)' }}>
        <div style={{
          maxWidth: 'var(--max-w)', margin: '0 auto', padding: '20px var(--gutter)',
          display: 'flex', gap: '48px', flexWrap: 'wrap',
        }}>
          {[
            { n: '47', l: 'MODELS TRACKED' },
            { n: '12', l: 'PROVIDERS' },
            { n: '$0', l: 'COST TO USE' },
            { n: 'Daily', l: 'UPDATE CADENCE' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '28px', fontWeight: 700, color: 'var(--fg-1)', letterSpacing: '-0.02em' }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '80px var(--gutter)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ FIND YOUR EDGE ]</div>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', letterSpacing: '-0.02em', color: 'var(--fg-1)', lineHeight: 0.96, marginBottom: '16px' }}>
          Stop overpaying<br />
          <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-3)' }}>for AI you don't need.</span>
        </h2>
        <p style={{ color: 'var(--fg-3)', fontSize: '16px', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 28px' }}>
          The model landscape changes every week. ValueAI cuts through the noise.
        </p>
        <button onClick={() => setPage('compare')} style={{
          background: 'var(--electric)', color: '#fff',
          fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px',
          padding: '13px 32px', borderRadius: 'var(--r-3)', border: 'none', cursor: 'pointer',
        }}>Start comparing — it's free</button>
      </section>
    </div>
  );
};

Object.assign(window, { HomePage });
