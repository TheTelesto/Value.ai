import { render, screen } from '@testing-library/react'
import { BenchmarkBar } from '../BenchmarkBar'

describe('BenchmarkBar', () => {
  it('renders label and score', () => {
    render(<BenchmarkBar label="MMLU" score={88.7} />)
    expect(screen.getByText('MMLU')).toBeInTheDocument()
    expect(screen.getByText('88.7%')).toBeInTheDocument()
  })
})
