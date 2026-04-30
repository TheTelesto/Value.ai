import { Recommendation } from '@/types'
import { UseCaseTag } from '@/components/shared/UseCaseTag'

type Props = {
  result: Recommendation | null
  onReset: () => void
}

export function ResultCard({ result, onReset }: Props) {
  if (!result) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <p className="text-gray-600 mb-4">
          We couldn&apos;t find a perfect match — explore our{' '}
          <a href="/pricing" className="text-violet-600 underline">
            pricing page
          </a>{' '}
          for all options.
        </p>
        <button onClick={onReset} className="text-sm text-violet-600 hover:underline">
          Start over
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 p-8">
        <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">
          Best value for you
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{result.recommendedPlan}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{result.reasoning}</p>
        {result.alternatives.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">Also consider</p>
            <div className="flex flex-wrap gap-2">
              {result.alternatives.map(alt => (
                <UseCaseTag key={alt} label={alt} />
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onReset}
        className="mt-4 text-sm text-violet-600 hover:underline"
      >
        Start over
      </button>
    </div>
  )
}
