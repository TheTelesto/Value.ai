import Link from 'next/link'
import { freeModels } from '@/data/free-models'
import { FreeModelCard } from './FreeModelCard'

export const metadata = {
  title: 'Free & Open Source AI Models — ValueAI',
  description: 'The best free and open-weight AI models you can run locally.',
}

export default function FreeModelsPage() {
  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px var(--gutter) 80px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link href="/models" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--electric)', background: 'none', border: 'none', cursor: 'pointer' }}>
            &larr; All Models
          </Link>
        </div>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>OPEN SOURCE MODELS</div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.02em', color: 'var(--fg-1)' }}>
            Free & Open Source
          </h1>
          <p style={{ color: 'var(--fg-3)', fontSize: '15px', marginTop: '8px' }}>
            High-quality models you can run locally or access for free.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px' }}>
          {freeModels.map(model => (
            <FreeModelCard key={model.name} model={model} />
          ))}
        </div>
      </div>
    </div>
  )
}
