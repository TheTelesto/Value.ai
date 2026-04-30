// BlogPage.jsx — ValueAI blog / changelog feed
const { useState } = React;

const POSTS = [
  { id:1, date:'2025-04-28', category:'ANALYSIS', title:'Claude Sonnet 4 vs GPT-4o: the $20/mo shootout', summary:'Both models cost $20 per month. One delivers 200k context and lower API prices. The other has better multimodal chops. Here is the breakdown.', readTime:'4 min', tag:'FLAGSHIP DUEL', tagColor:'var(--electric)' },
  { id:2, date:'2025-04-20', category:'PRICING', title:'Google cuts Gemini Flash pricing by 60%', summary:'Effective April 20th, Gemini 2.0 Flash input tokens dropped from $0.25 to $0.10/1M. This changes the free-tier calculus significantly.', readTime:'2 min', tag:'PRICE CHANGE', tagColor:'var(--warn)' },
  { id:3, date:'2025-04-14', category:'FEATURE', title:'OpenAI rolls out o3-mini reasoning to Plus users', summary:'The o3-mini model — previously Pro-only — is now available to $20/mo Plus subscribers. Rate limits apply: 50 messages per day.', readTime:'3 min', tag:'NEW ACCESS', tagColor:'var(--good)' },
  { id:4, date:'2025-04-07', category:'GUIDE', title:'How to pick an AI plan in 2025: a practical framework', summary:'Stop defaulting to ChatGPT because everyone uses it. We built a decision matrix covering workload, budget, and context needs.', readTime:'6 min', tag:'GUIDE', tagColor:'var(--ultra)' },
  { id:5, date:'2025-03-30', category:'CHANGELOG', title:'Meta releases Llama 3.3 70B with improved coding', summary:'Open-source baseline has shifted again. HumanEval scores place Llama 3.3 70B ahead of GPT-3.5 on coding benchmarks at near-zero cost.', readTime:'3 min', tag:'OPEN SOURCE', tagColor:'var(--cyan)' },
];

const BlogPage = ({ setPage }) => {
  const [hov, setHov] = useState(null);

  return (
    <div style={{ paddingTop:'56px', minHeight:'100vh' }}>
      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'40px var(--gutter)' }}>
        {/* Header */}
        <div style={{ marginBottom:'36px', display:'grid', gridTemplateColumns:'1fr auto', gap:'24px', alignItems:'flex-end' }}>
          <div>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--fg-4)', textTransform:'uppercase', letterSpacing:'0.12em', marginBottom:'8px' }}>[ ANALYSIS · CHANGELOG · GUIDES ]</div>
            <h1 style={{ fontFamily:'var(--font-sans)', fontWeight:800, fontSize:'clamp(28px,4vw,48px)', letterSpacing:'-0.02em', color:'var(--fg-1)', lineHeight:0.96 }}>
              Intelligence<br />
              <span style={{ fontFamily:'Instrument Serif, serif', fontStyle:'italic', fontWeight:400, color:'var(--fg-3)' }}>worth reading.</span>
            </h1>
          </div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'12px', color:'var(--fg-4)', textAlign:'right' }}>
            <div>{POSTS.length} posts</div>
            <div style={{ color:'var(--fg-3)', marginTop:'4px' }}>Updated weekly</div>
          </div>
        </div>

        {/* Featured post */}
        <div
          onClick={() => {}}
          onMouseEnter={() => setHov('featured')}
          onMouseLeave={() => setHov(null)}
          style={{
            background: hov==='featured' ? 'var(--bg-2)' : 'var(--bg-1)',
            border:`1px solid ${hov==='featured' ? 'var(--line-3)' : 'var(--line-2)'}`,
            borderRadius:'var(--r-3)', padding:'28px 32px', marginBottom:'16px',
            cursor:'pointer', transition:'all 220ms var(--ease-out)',
            transform: hov==='featured' ? 'translateY(-2px)' : 'none',
            boxShadow: hov==='featured' ? 'var(--shadow-2)' : 'none',
          }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px' }}>
            <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:POSTS[0].tagColor, background:`${POSTS[0].tagColor}18`, border:`1px solid ${POSTS[0].tagColor}40`, padding:'2px 9px', borderRadius:'var(--r-pill)' }}>{POSTS[0].tag}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--fg-4)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{POSTS[0].category}</span>
            </div>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--fg-4)' }}>{POSTS[0].date}</span>
          </div>
          <h2 style={{ fontFamily:'var(--font-sans)', fontWeight:700, fontSize:'22px', letterSpacing:'-0.01em', color:'var(--fg-1)', marginBottom:'10px', lineHeight:1.2 }}>{POSTS[0].title}</h2>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'15px', color:'var(--fg-3)', lineHeight:1.6, maxWidth:'600px', marginBottom:'12px' }}>{POSTS[0].summary}</p>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--electric)' }}>Read → {POSTS[0].readTime}</span>
        </div>

        {/* Post list */}
        {POSTS.slice(1).map((post, i) => (
          <div
            key={post.id}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              display:'grid', gridTemplateColumns:'80px 1fr auto',
              gap:'20px', alignItems:'start',
              padding:'20px 0',
              borderBottom:'1px solid var(--line-1)',
              cursor:'pointer',
              background: hov===i ? 'var(--bg-2)' : 'transparent',
              borderRadius: hov===i ? 'var(--r-3)' : '0',
              paddingLeft: hov===i ? '16px' : '0',
              paddingRight: hov===i ? '16px' : '0',
              transition:'all 150ms',
            }}>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:'var(--fg-4)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{post.category}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--fg-4)', marginTop:'4px' }}>{post.date}</div>
            </div>
            <div>
              <h3 style={{ fontFamily:'var(--font-sans)', fontWeight:600, fontSize:'16px', color:'var(--fg-1)', marginBottom:'6px', lineHeight:1.3 }}>{post.title}</h3>
              <p style={{ fontFamily:'var(--font-sans)', fontSize:'13px', color:'var(--fg-3)', lineHeight:1.5 }}>{post.summary}</p>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'8px', paddingTop:'2px' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', color:post.tagColor, background:`${post.tagColor}18`, border:`1px solid ${post.tagColor}40`, padding:'2px 8px', borderRadius:'var(--r-pill)' }}>{post.tag}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'var(--fg-4)' }}>{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { BlogPage });
