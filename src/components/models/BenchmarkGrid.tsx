import { Model } from '@/types'

export function BenchmarkGrid({ models }: { models: Model[] }) {
  const allBenchmarks = Array.from(
    new Set(
      models.flatMap(m =>
        Object.entries(m.benchmarks)
          .filter(([, v]) => v !== undefined)
          .map(([k]) => k)
      )
    )
  )

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Model</th>
            {allBenchmarks.map(b => (
              <th
                key={b}
                className="text-right py-3 px-3 font-semibold text-gray-500 uppercase text-xs tracking-wide"
              >
                {b}
              </th>
            ))}
            <th className="text-right py-3 px-4 font-semibold text-gray-500 uppercase text-xs tracking-wide">
              Context
            </th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, i) => (
            <tr
              key={model.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                i === models.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <td className="py-3 px-4">
                <p className="font-semibold text-gray-900">{model.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{model.provider}</p>
              </td>
              {allBenchmarks.map(b => (
                <td key={b} className="text-right py-3 px-3 text-gray-700">
                  {model.benchmarks[b] !== undefined ? `${model.benchmarks[b]}%` : '\u2014'}
                </td>
              ))}
              <td className="text-right py-3 px-4 text-gray-700">
                {(model.contextWindow / 1000).toFixed(0)}K
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
