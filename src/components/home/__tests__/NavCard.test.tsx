import { render, screen } from '@testing-library/react'
import { NavCard } from '../NavCard'

describe('NavCard', () => {
  it('renders title, subtitle and links to href', () => {
    render(
      <NavCard
        icon="💰"
        title="Compare Pricing"
        subtitle="Side-by-side plan comparison."
        href="/pricing"
        gradient="linear-gradient(135deg, #f0fdf4, #dcfce7)"
      />
    )
    expect(screen.getByText('Compare Pricing')).toBeInTheDocument()
    expect(screen.getByText('Side-by-side plan comparison.')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/pricing')
  })
})
