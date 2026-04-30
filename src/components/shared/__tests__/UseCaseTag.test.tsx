import { render, screen } from '@testing-library/react'
import { UseCaseTag } from '../UseCaseTag'

describe('UseCaseTag', () => {
  it('renders the label', () => {
    render(<UseCaseTag label="Coding" />)
    expect(screen.getByText('Coding')).toBeInTheDocument()
  })
})
