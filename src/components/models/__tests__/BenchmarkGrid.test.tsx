import { render, screen } from '@testing-library/react'
import { BenchmarkGrid } from '../BenchmarkGrid'
import { Model } from '@/types'

const models: Model[] = [
  {
    id: 'model-a',
    name: 'Model A',
    provider: 'Provider A',
    releaseDate: '2024-01',
    contextWindow: 128000,
    benchmarks: { mmlu: 88.7 },
    capabilities: [],
    bestFor: [],
    accessedVia: [],
  },
]

describe('BenchmarkGrid', () => {
  it('renders model names', () => {
    render(<BenchmarkGrid models={models} />)
    expect(screen.getByText('Model A')).toBeInTheDocument()
  })

  it('renders benchmark column headers', () => {
    render(<BenchmarkGrid models={models} />)
    expect(screen.getByText('mmlu')).toBeInTheDocument()
  })
})
