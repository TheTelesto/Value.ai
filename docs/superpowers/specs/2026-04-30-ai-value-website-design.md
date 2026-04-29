# AI Value — Website Design Spec
**Date:** 2026-04-30

## Overview

A multi-page website that helps both general users and tech-savvy power users understand and compare AI subscriptions, models, benchmarks, and find the best value for their specific use case.

## Tech Stack

- **Framework:** Next.js 14+ (App Router, static export)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Static (`next export`) — Vercel, Netlify, or GitHub Pages
- **Content:** TypeScript data files in `src/data/` — no CMS, no database

## Visual Design

- Light base with vibrant gradients and per-provider accent colours
- Each AI provider has its own brand colour used consistently across all pages
- Clean whitespace with bold typographic hierarchy

## Pages & Routes

### `/` — Home
Hero section with a clear value proposition ("Find the right AI for you") and large `NavCard` components linking to each section. No deep content — acts as a launchpad.

### `/pricing` — Pricing Plans
Displays all paid plans across providers. Users can filter by use-case tag (Coding, Writing, Research, Agents, etc.). Each plan rendered as a `PlanCard` with price, included models, feature list, and best-for tags.

### `/models` — Model Comparison
Collates benchmarks (MMLU, HumanEval, GPQA, etc.), context windows, capabilities, and use cases across all major models. Includes a `BenchmarkGrid` for side-by-side comparison.

### `/models/free` — Free & Self-Hosted Models
Sub-page covering open-weight and freely accessible models. Includes self-hosting difficulty ratings, minimum VRAM requirements, recommended hosting tools (Ollama, HuggingFace, etc.), and best-for tags.

### `/use-case` — Find Your Best Value
Interactive multi-step recommender. User answers questions about their needs, budget, and primary use case. The wizard matches answers against pre-defined conditions and surfaces a recommended plan with reasoning and alternatives.

## Data Model

All content is populated by editing files in `src/data/`.

### `data/plans.ts`
```ts
type Plan = {
  provider: string
  providerSlug: string
  accentColor: string
  name: string
  price: number          // monthly USD (0 = free tier)
  pricingNote?: string   // e.g. "billed annually"
  tier: 'free' | 'plus' | 'pro' | 'team' | 'enterprise'
  models: string[]
  features: string[]
  bestFor: string[]      // e.g. ["Coding", "Agents", "Writing"]
  limits?: { messages?: number; period?: string }
}
```

### `data/models.ts`
```ts
type Model = {
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
  capabilities: string[]   // e.g. ["Vision", "Code", "Function calling"]
  bestFor: string[]
  accessedVia: string[]    // plan names that include this model
  apiPricing?: { inputPer1M: number; outputPer1M: number }
}
```

### `data/free-models.ts`
```ts
type FreeModel = {
  name: string
  provider: string
  parameters: string         // e.g. "70B"
  license: string            // e.g. "Apache 2.0"
  contextWindow: number
  selfHostDifficulty: 'easy' | 'medium' | 'hard'
  minVram?: string           // e.g. "16GB"
  hostingOptions: string[]   // e.g. ["Ollama", "HuggingFace"]
  benchmarks: { mmlu?: number; humaneval?: number; [key: string]: number | undefined }
  bestFor: string[]
}
```

### `data/use-cases.ts`
```ts
type Question = {
  id: string
  text: string
  options: { value: string; label: string; description?: string }[]
}

type Recommendation = {
  conditions: Record<string, string>  // question id → answer value
  recommendedPlan: string
  reasoning: string
  alternatives: string[]
}

export const questions: Question[]
export const recommendations: Recommendation[]
```

## Components

### Shared
| Component | Purpose |
|---|---|
| `ProviderBadge` | Coloured chip with provider name, reused across all pages |
| `UseCaseTag` | Pill tag for use-case labels (Coding, Writing, etc.) |
| `BenchmarkBar` | Single horizontal bar showing a benchmark score |

### Home
| Component | Purpose |
|---|---|
| `NavCard` | Large clickable card to a section with icon, title, description |

### Pricing
| Component | Purpose |
|---|---|
| `PlanCard` | Full plan display: price, tier, features, best-for tags |
| `PricingFilter` | Tag-based filter to narrow visible plans by use case |

### Models
| Component | Purpose |
|---|---|
| `ModelCard` | Model detail: context window, benchmarks, capabilities |
| `BenchmarkGrid` | Side-by-side benchmark comparison across models |

### Use Case
| Component | Purpose |
|---|---|
| `RecommenderWizard` | Multi-step question flow with progress indicator |
| `ResultCard` | Final recommendation with reasoning and alternatives |

## Key Constraints

- All pages must be statically exported (no server-side runtime required)
- Populating content = editing TypeScript data files only, no code changes needed
- The recommender logic lives entirely in `data/use-cases.ts` conditions — no algorithmic complexity
