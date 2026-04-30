import { findRecommendation } from '../recommender'
import { Recommendation } from '@/types'

const recs: Recommendation[] = [
  {
    conditions: { use: 'coding', budget: 'low' },
    recommendedPlan: 'Claude Pro',
    reasoning: 'Best coder',
    alternatives: [],
  },
  {
    conditions: { budget: 'free' },
    recommendedPlan: 'Free tier',
    reasoning: 'No cost',
    alternatives: [],
  },
]

describe('findRecommendation', () => {
  it('returns the most specific matching recommendation', () => {
    const result = findRecommendation({ use: 'coding', budget: 'low' }, recs)
    expect(result?.recommendedPlan).toBe('Claude Pro')
  })

  it('falls back to a less specific recommendation when no exact match', () => {
    const result = findRecommendation({ use: 'writing', budget: 'free' }, recs)
    expect(result?.recommendedPlan).toBe('Free tier')
  })

  it('returns null when no conditions match', () => {
    const result = findRecommendation({ use: 'agents', budget: 'high' }, recs)
    expect(result).toBeNull()
  })
})
