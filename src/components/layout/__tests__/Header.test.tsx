import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders the site brand text', () => {
    render(<Header />)
    expect(screen.getByText('value')).toBeInTheDocument()
    expect(screen.getByText('ai')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('link', { name: /pricing/i })).toHaveAttribute('href', '/pricing')
    expect(screen.getByRole('link', { name: /models/i })).toHaveAttribute('href', '/models')
    expect(screen.getByRole('link', { name: /get started/i })).toHaveAttribute('href', '/use-case')
  })
})
