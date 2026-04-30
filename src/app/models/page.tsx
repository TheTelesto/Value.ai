import Link from 'next/link'
import { models } from '@/data/models'
import { ModelCard } from '@/components/models/ModelCard'
import { BenchmarkGrid } from '@/components/models/BenchmarkGrid'

export const metadata = {
  title: 'AI Models Comparison — AI Value',
  description: 'Compare AI models by benchmarks, context window, and capabilities.',
}

export default function ModelsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 flex-1">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Models</h1>
          <p className="text-xl text-gray-500">
            Benchmarks, context windows, and capabilities — all in one place.
          </p>
        </div>
        <Link
          href="/models/free"
          className="rounded-xl bg-violet-50 border border-violet-200 px-4 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-100 transition-colors whitespace-nowrap"
        >
          🆓 Free & Open Source →
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Benchmark Comparison</h2>
        <BenchmarkGrid models={models} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Details</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>
    </main>
  )
}
