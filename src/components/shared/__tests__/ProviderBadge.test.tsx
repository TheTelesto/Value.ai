import { render, screen } from '@testing-library/react'
import { ProviderBadge } from '../ProviderBadge'

describe('ProviderBadge', () => {
  it('renders the provider name', () => {
    render(<ProviderBadge name="OpenAI" color="#10a37f" />)
    expect(screen.getByText('OpenAI')).toBeInTheDocument()
  })
})
