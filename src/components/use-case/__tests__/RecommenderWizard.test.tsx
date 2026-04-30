import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecommenderWizard } from '../RecommenderWizard'
import { Question, Recommendation } from '@/types'

const questions: Question[] = [
  {
    id: 'use',
    text: 'What do you use AI for?',
    options: [
      { value: 'coding', label: 'Coding' },
      { value: 'writing', label: 'Writing' },
    ],
  },
  {
    id: 'budget',
    text: 'What is your budget?',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'low', label: 'Under $25' },
    ],
  },
]

const recommendations: Recommendation[] = [
  {
    conditions: { use: 'coding', budget: 'low' },
    recommendedPlan: 'Claude Pro',
    reasoning: 'Best for coders.',
    alternatives: ['ChatGPT Plus'],
  },
]

describe('RecommenderWizard', () => {
  it('shows the first question on mount', () => {
    render(<RecommenderWizard questions={questions} recommendations={recommendations} />)
    expect(screen.getByText('What do you use AI for?')).toBeInTheDocument()
  })

  it('advances to the next question after selecting an answer', async () => {
    render(<RecommenderWizard questions={questions} recommendations={recommendations} />)
    await userEvent.click(screen.getByText('Coding'))
    expect(screen.getByText('What is your budget?')).toBeInTheDocument()
  })

  it('shows the result after all questions are answered', async () => {
    render(<RecommenderWizard questions={questions} recommendations={recommendations} />)
    await userEvent.click(screen.getByText('Coding'))
    await userEvent.click(screen.getByText('Under $25'))
    expect(screen.getByText('Claude Pro')).toBeInTheDocument()
  })

  it('shows a fallback message when no recommendation matches', async () => {
    render(<RecommenderWizard questions={questions} recommendations={recommendations} />)
    await userEvent.click(screen.getByText('Writing'))
    await userEvent.click(screen.getByText('Free'))
    expect(screen.getByText(/couldn't find/i)).toBeInTheDocument()
  })
})
