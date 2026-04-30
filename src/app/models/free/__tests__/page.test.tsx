import { render, screen } from '@testing-library/react'
import FreeModelsPage from '../page'

describe('FreeModelsPage', () => {
  it('renders the page heading', () => {
    render(<FreeModelsPage />)
    expect(screen.getByRole('heading', { name: /free/i })).toBeInTheDocument()
  })
})
