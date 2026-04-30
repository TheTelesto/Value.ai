export type Plan = {
  provider: string
  providerSlug: string
  accentColor: string
  name: string
  price: number
  pricingNote?: string
  tier: 'free' | 'plus' | 'pro' | 'team' | 'enterprise'
  models: string[]
  features: string[]
  bestFor: string[]
  limits?: { messages?: number; period?: string }
}

export type Model = {
  id: string
  name: string
  provider: string
  releaseDate: string
  contextWindow: number
  benchmarks: {
    mmlu?: number
    humaneval?: number
    gpqa?: number
    [key: string]: number | undefined
  }
  capabilities: string[]
  bestFor: string[]
  accessedVia: string[]
  apiPricing?: { inputPer1M: number; outputPer1M: number }
}

export type FreeModel = {
  name: string
  provider: string
  parameters: string
  license: string
  contextWindow: number
  selfHostDifficulty: 'easy' | 'medium' | 'hard'
  minVram?: string
  hostingOptions: string[]
  benchmarks: {
    mmlu?: number
    humaneval?: number
    [key: string]: number | undefined
  }
  bestFor: string[]
}

export type Question = {
  id: string
  text: string
  options: { value: string; label: string; description?: string }[]
}

export type Recommendation = {
  conditions: Record<string, string>
  recommendedPlan: string
  reasoning: string
  alternatives: string[]
}
