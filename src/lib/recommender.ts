import { Recommendation } from '@/types'

export function findRecommendation(
  answers: Record<string, string>,
  recommendations: Recommendation[]
): Recommendation | null {
  const sorted = [...recommendations].sort(
    (a, b) => Object.keys(b.conditions).length - Object.keys(a.conditions).length
  )
  return (
    sorted.find(rec =>
      Object.entries(rec.conditions).every(([id, value]) => answers[id] === value)
    ) ?? null
  )
}
