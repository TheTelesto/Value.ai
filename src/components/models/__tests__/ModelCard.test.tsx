import { render, screen } from '@testing-library/react'
import { ModelCard } from '../ModelCard'
import { Model } from '@/types'

const model: Model = {
  id: 'gpt-4o',
  name: 'GPT-4o',
  provider: 'OpenAI',
  releaseDate: '2024-05',
  contextWindow: 128000,
  benchmarks: { mmlu: 88.7 },
  capabilities: ['Vision', 'Code'],
  bestFor: ['Coding'],
  accessedVia: ['ChatGPT Plus'],
}

describe('ModelCard', () => {
  it('renders model name and provider', () => {
    render(<ModelCard model={model} />)
    expect(screen.getByText('GPT-4o')).toBeInTheDocument()
    expect(screen.getByText('OpenAI')).toBeInTheDocument()
  })

  it('renders context window in K format', () => {
    render(<ModelCard model={model} />)
    expect(screen.getByText('128K ctx')).toBeInTheDocument()
  })

  it('renders capabilities as tags', () => {
    render(<ModelCard model={model} />)
    expect(screen.getByText('Vision')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
  })
})
