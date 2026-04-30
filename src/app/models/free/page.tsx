import Link from 'next/link'
import { freeModels } from '@/data/free-models'
import { UseCaseTag } from '@/components/shared/UseCaseTag'
import { BenchmarkBar } from '@/components/shared/BenchmarkBar'

export const metadata = {
  title: 'Free & Self-Hosted AI Models — AI Value',
  description: 'The best free and open-weight AI models you can run locally.',
}

const difficultyLabel: Record<string, string> = {
  easy: '\uD83D\uDFE2 Easy',
  medium: '\uD83D\uDFE1 Medium',
  hard: '\uD83D\uDD34 Hard',
}

export default function FreeModelsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 flex-1">
      <div className="mb-4">
        <Link href="/models" className="text-sm text-violet-600 hover:underline">
          ← All Models
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Free & Open Source Models</h1>
      <p className="text-xl text-gray-500 mb-10">
        High-quality models you can run locally or access for free. No subscription needed.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {freeModels.map(model => {
          const benchmarkEntries = Object.entries(model.benchmarks).filter(
            (entry): entry is [string, number] => entry[1] !== undefined
          )
          return (
            <div key={model.name} className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{model.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{model.provider} · {model.parameters}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1">
                  {(model.contextWindow / 1000).toFixed(0)}K ctx
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600">
                  {difficultyLabel[model.selfHostDifficulty]} to self-host
                </span>
                {model.minVram && (
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600">
                    {model.minVram} VRAM
                  </span>
                )}
                <span className="rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-green-700">
                  {model.license}
                </span>
              </div>

              {benchmarkEntries.length > 0 && (
                <div className="space-y-2 mb-4">
                  {benchmarkEntries.map(([key, val]) => (
                    <BenchmarkBar key={key} label={key.toUpperCase()} score={val} />
                  ))}
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                  Run with
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {model.hostingOptions.map(h => (
                    <span key={h} className="rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-xs text-blue-700">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {model.bestFor.map(tag => (
                  <UseCaseTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
