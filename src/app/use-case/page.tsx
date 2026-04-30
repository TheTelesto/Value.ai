import { questions, recommendations } from '@/data/use-cases'
import { RecommenderWizard } from '@/components/use-case/RecommenderWizard'

export const metadata = {
  title: 'Find Your AI Plan — ValueAI',
  description: 'Answer a few questions to get a personalised AI subscription recommendation.',
}

export default function UseCasePage() {
  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '80px var(--gutter)' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>FIND YOUR PLAN</div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', letterSpacing: '-0.02em', color: 'var(--fg-1)', marginBottom: '12px' }}>
            Find your best value
          </h1>
          <p style={{ color: 'var(--fg-3)', fontSize: '16px', maxWidth: '480px', margin: '0 auto' }}>
            Answer a few quick questions and we&apos;ll recommend the AI subscription that fits you best.
          </p>
        </div>
        <RecommenderWizard questions={questions} recommendations={recommendations} />
      </div>
    </div>
  )
}
