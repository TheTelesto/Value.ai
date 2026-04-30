import { render, screen } from '@testing-library/react'
import { PlanCard } from '../PlanCard'
import { Plan } from '@/types'

const plan: Plan = {
  provider: 'Anthropic',
  providerSlug: 'anthropic',
  accentColor: '#d97757',
  name: 'Claude Pro',
  price: 20,
  tier: 'pro',
  models: ['Claude 3.5 Sonnet'],
  features: ['Access to all Claude models'],
  bestFor: ['Coding'],
}

describe('PlanCard', () => {
  it('renders plan name and price', () => {
    render(<PlanCard plan={plan} />)
    expect(screen.getByText('Claude Pro')).toBeInTheDocument()
    expect(screen.getByText('$20')).toBeInTheDocument()
  })

  it('renders provider badge', () => {
    render(<PlanCard plan={plan} />)
    expect(screen.getByText('Anthropic')).toBeInTheDocument()
  })

  it('renders best-for tags', () => {
    render(<PlanCard plan={plan} />)
    expect(screen.getByText('Coding')).toBeInTheDocument()
  })

  it('renders "Free" for price 0', () => {
    render(<PlanCard plan={{ ...plan, price: 0 }} />)
    expect(screen.getByText('Free')).toBeInTheDocument()
  })
})
