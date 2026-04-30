// ModelPage.jsx — ValueAI model detail
const { useState } = React;

const VALUE_COLORS = ['#ff5d6c','#ff8c42','#ffd042','#87dc5f','#3ddc97'];
const VALUE_LABELS = ['Poor value','Below average','Average','Good value','Best value'];

const ModelPage = ({ model, setPage }) => {
  const [tab, setTab] = useState('overview');
  const m = model || { model:'Claude Sonnet 4', provider:'Anthropic', tier:'Pro', price:20, apiPer1m:3.0, ctx:'200k', vision:true, code:true, agents:true, value:5, tag:'BEST VALUE', tagColor:'var(--good)' };

  const caps = [
    { label:'Reasoning & analysis', score:9 },
    { label:'Code generation', score:9 },
    { label:'Long-form writing', score:8 },
    { label:'Vision / multimodal', score: m.vision ? 7 : 0 },
    { label:'Agentic / tool use', score: m.agents ? 9 : 3 },
    { label:'Math & logic', score:8 },
  ];

  const log = [
    { date:'2025-04-15', note:`API price reduced to $${m.apiPer1m}/1M input tokens.` },
    { date:'2025-03-01', note:`Context window set to ${m.ctx}.` },
    { date:'2025-01-20', note:'Model released.' },
  ];

  const Stat = ({ label, value, accent }) => (
    <div style={{ padding:'16px', background:'var(--bg-2)', border:'1px solid var(--line-2)', borderRadius:'var(--r-3)' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--fg-4)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'6px' }}>{label}</div>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'20px', fontWeight:700, color:accent||'var(--fg-1)' }}>{value}</div>
    </div>
  );

  return (
    <div style={{ paddingTop:'56px', minHeight:'100vh' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'40px var(--gutter)' }}>
        {/* Breadcrumb */}
        <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'24px', fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--fg-4)' }}>
          <button onClick={() => setPage('compare')} style={{ color:'var(--electric)', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:'inherit' }}>← Compare</button>
          <span>/</span><span>{m.provider}</span><span>/</span>
          <span style={{ color:'var(--fg-2)' }}>{m.model}</span>
        </div>

        {/* Title + tag */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'20px', marginBottom:'24px' }}>
          <div>
            <h1 style={{ fontFamily:'var(--font-sans)', fontWeight:800, fontSize:'clamp(28px,4vw,48px)', letterSpacing:'-0.02em', color:'var(--fg-1)', marginBottom:'8px' }}>{m.model}</h1>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:m.tagColor, background:`${m.tagColor}18`, border:`1px solid ${m.tagColor}40`, padding:'3px 10px', borderRadius:'var(--r-pill)' }}>{m.tag}</span>
          </div>
          {/* Value verdict box */}
          <div style={{ background:'var(--bg-2)', border:`1px solid ${m.tagColor}40`, borderRadius:'var(--r-3)', padding:'16px 24px', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--fg-4)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'8px' }}>VALUE SCORE</div>
            <div style={{ display:'flex', gap:'3px', justifyContent:'center', marginBottom:'6px' }}>
              {[1,2,3,4,5].map(i => <div key={i} style={{ width:'20px', height:'7px', borderRadius:'2px', background: i <= m.value ? VALUE_COLORS[m.value-1] : 'var(--bg-4)' }}></div>)}
            </div>
            <div style={{ fontFamily:'var(--font-sans)', fontSize:'13px', fontWeight:600, color:VALUE_COLORS[m.value-1] }}>{VALUE_LABELS[m.value-1]}</div>
          </div>
        </div>

        {/* Stat grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(130px,1fr))', gap:'8px', marginBottom:'32px' }}>
          <Stat label="Subscription" value={m.price === 0 ? 'Free' : `$${m.price}/mo`} accent={m.price===0 ? 'var(--good)' : undefined} />
          <Stat label="API input/1M" value={`$${m.apiPer1m}`} />
          <Stat label="Context" value={m.ctx} accent="var(--cyan)" />
          <Stat label="Vision" value={m.vision ? '✓ Yes' : '✕ No'} accent={m.vision ? 'var(--good)' : 'var(--bad)'} />
          <Stat label="Agents" value={m.agents ? '✓ Yes' : '✕ No'} accent={m.agents ? 'var(--good)' : 'var(--bad)'} />
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:'2px', borderBottom:'1px solid var(--line-1)', marginBottom:'24px' }}>
          {['overview','changelog'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              fontFamily:'var(--font-mono)', fontSize:'12px', fontWeight:500,
              padding:'10px 16px', textTransform:'uppercase', letterSpacing:'0.08em',
              color: tab===t ? 'var(--fg-1)' : 'var(--fg-4)',
              borderBottom: `2px solid ${tab===t ? 'var(--electric)' : 'transparent'}`,
              background:'none', cursor:'pointer', transition:'all 150ms',
            }}>{t}</button>
          ))}
        </div>

        {tab === 'overview' && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
            {/* Capabilities */}
            <div style={{ background:'var(--bg-2)', border:'1px solid var(--line-2)', borderRadius:'var(--r-3)', padding:'20px' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--fg-4)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'16px' }}>CAPABILITY SCORES</div>
              {caps.map(c => (
                <div key={c.label} style={{ marginBottom:'14px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                    <span style={{ fontFamily:'var(--font-sans)', fontSize:'13px', color:'var(--fg-2)' }}>{c.label}</span>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--fg-4)' }}>{c.score}/10</span>
                  </div>
                  <div style={{ height:'4px', background:'var(--bg-4)', borderRadius:'2px', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${c.score*10}%`, background:'linear-gradient(90deg, var(--electric), var(--cyan))', borderRadius:'2px' }}></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Best for / not for */}
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <div style={{ background:'var(--bg-2)', border:'1px solid var(--line-2)', borderRadius:'var(--r-3)', padding:'20px', flex:1 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--good)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'12px' }}>BEST FOR</div>
                {['Long-form document analysis','Complex multi-step coding','Agentic / automated tasks','Technical deep research'].map(u => (
                  <div key={u} style={{ display:'flex', gap:'8px', marginBottom:'8px', fontFamily:'var(--font-sans)', fontSize:'13px', color:'var(--fg-2)' }}>
                    <span style={{ color:'var(--good)' }}>✓</span>{u}
                  </div>
                ))}
              </div>
              <div style={{ background:'var(--bg-2)', border:'1px solid var(--line-2)', borderRadius:'var(--r-3)', padding:'20px', flex:1 }}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--bad)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'12px' }}>NOT IDEAL FOR</div>
                {['Real-time web search','Audio generation','Image creation (no DALL-E)'].map(u => (
                  <div key={u} style={{ display:'flex', gap:'8px', marginBottom:'8px', fontFamily:'var(--font-sans)', fontSize:'13px', color:'var(--fg-3)' }}>
                    <span style={{ color:'var(--bad)' }}>✕</span>{u}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'changelog' && (
          <div>
            {log.map((entry, i) => (
              <div key={i} style={{ display:'flex', gap:'20px', paddingBottom:'16px', marginBottom:'16px', borderBottom:'1px solid var(--line-1)' }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--fg-4)', minWidth:'90px', paddingTop:'2px' }}>{entry.date}</span>
                <span style={{ fontFamily:'var(--font-sans)', fontSize:'14px', color:'var(--fg-2)', lineHeight:1.5 }}>{entry.note}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { ModelPage });
