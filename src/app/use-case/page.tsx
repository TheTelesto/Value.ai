import { questions, recommendations } from '@/data/use-cases'
import { RecommenderWizard } from '@/components/use-case/RecommenderWizard'

export const metadata = {
  title: 'Find Your AI Plan — AI Value',
  description: 'Answer a few questions to get a personalised AI subscription recommendation.',
}

export default function UseCasePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 flex-1">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Best Value</h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Answer a few quick questions and we&apos;ll recommend the AI subscription that fits you best.
        </p>
      </div>
      <RecommenderWizard questions={questions} recommendations={recommendations} />
    </main>
  )
}
