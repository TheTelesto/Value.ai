import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PricingFilter } from '../PricingFilter'

describe('PricingFilter', () => {
  it('renders All button and all tag buttons', () => {
    render(<PricingFilter tags={['Coding', 'Writing']} selected={null} onChange={jest.fn()} />)
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Coding')).toBeInTheDocument()
    expect(screen.getByText('Writing')).toBeInTheDocument()
  })

  it('calls onChange with tag name when a tag is clicked', async () => {
    const onChange = jest.fn()
    render(<PricingFilter tags={['Coding']} selected={null} onChange={onChange} />)
    await userEvent.click(screen.getByText('Coding'))
    expect(onChange).toHaveBeenCalledWith('Coding')
  })

  it('calls onChange with null when All is clicked', async () => {
    const onChange = jest.fn()
    render(<PricingFilter tags={['Coding']} selected="Coding" onChange={onChange} />)
    await userEvent.click(screen.getByText('All'))
    expect(onChange).toHaveBeenCalledWith(null)
  })
})
