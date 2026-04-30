import { Model } from '@/types'
import { BenchmarkBar } from '@/components/shared/BenchmarkBar'
import { UseCaseTag } from '@/components/shared/UseCaseTag'

export function ModelCard({ model }: { model: Model }) {
  const benchmarkEntries = Object.entries(model.benchmarks).filter(
    (entry): entry is [string, number] => entry[1] !== undefined
  )

  return (
    <div className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{model.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{model.provider}</p>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1 whitespace-nowrap">
          {(model.contextWindow / 1000).toFixed(0)}K ctx
        </span>
      </div>
      {benchmarkEntries.length > 0 && (
        <div className="space-y-2 mb-4">
          {benchmarkEntries.map(([key, val]) => (
            <BenchmarkBar key={key} label={key.toUpperCase()} score={val} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {model.capabilities.map(c => (
          <UseCaseTag key={c} label={c} />
        ))}
      </div>
      {model.apiPricing && (
        <p className="mt-3 text-xs text-gray-400">
          API: ${model.apiPricing.inputPer1M}/1M in · ${model.apiPricing.outputPer1M}/1M out
        </p>
      )}
    </div>
  )
}
