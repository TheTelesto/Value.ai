import Link from 'next/link'
import { models } from '@/data/models'
import { ModelCard } from '@/components/models/ModelCard'
import { BenchmarkGrid } from '@/components/models/BenchmarkGrid'

export const metadata = {
  title: 'AI Models — ValueAI',
  description: 'Compare AI models by benchmarks, context window, and capabilities.',
}

export default function ModelsPage() {
  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px var(--gutter) 80px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>MODEL INTELLIGENCE</div>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.02em', color: 'var(--fg-1)' }}>
              AI Models
            </h1>
          </div>
          <Link href="/models/free" style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)',
            background: 'var(--bg-2)', border: '1px solid var(--line-2)',
            padding: '8px 16px', borderRadius: 'var(--r-3)',
            whiteSpace: 'nowrap',
          }}>
            Free &amp; Open Source &rarr;
          </Link>
        </div>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>BENCHMARK COMPARISON</h2>
          <BenchmarkGrid models={models} />
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>MODEL DETAILS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px' }}>
            {models.map(model => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
