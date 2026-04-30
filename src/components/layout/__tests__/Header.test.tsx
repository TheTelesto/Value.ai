import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

describe('Header', () => {
  it('renders the site name', () => {
    render(<Header />)
    expect(screen.getByText('AI Value')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /pricing/i })).toHaveAttribute('href', '/pricing')
    expect(screen.getByRole('link', { name: /models/i })).toHaveAttribute('href', '/models')
    expect(screen.getByRole('link', { name: /find my plan/i })).toHaveAttribute('href', '/use-case')
  })
})
