# AI Value Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Next.js website that lets users compare AI subscription plans, models, benchmarks, and get personalised recommendations.

**Architecture:** Next.js 14 App Router with `output: 'export'` for fully static generation. All content lives in TypeScript data files under `src/data/` — no CMS, no database. The recommender is a pure function that matches user answers against condition records in `data/use-cases.ts`.

**Tech Stack:** Next.js 14, Tailwind CSS, TypeScript, Jest, React Testing Library

---

## File Map

```
src/
  app/
    layout.tsx               # Root layout — wraps all pages in Header/Footer
    page.tsx                 # Home — hero + NavCards
    globals.css              # Tailwind base styles
    pricing/page.tsx         # Pricing plans page
    models/page.tsx          # Model comparison page
    models/free/page.tsx     # Free & self-hosted models sub-page
    use-case/page.tsx        # Interactive recommender page
  components/
    layout/
      Header.tsx             # Sticky nav with links to all sections
      Footer.tsx             # Simple footer
    shared/
      ProviderBadge.tsx      # Coloured chip — provider name
      UseCaseTag.tsx         # Grey pill — use-case label
      BenchmarkBar.tsx       # Labelled horizontal progress bar
    home/
      NavCard.tsx            # Large gradient card linking to a section
    pricing/
      PlanCard.tsx           # Full plan: price, features, tags
      PricingFilter.tsx      # Tag filter buttons (client component)
      PricingPageClient.tsx  # Client wrapper holding filter state
    models/
      ModelCard.tsx          # Model: benchmarks, context, capabilities
      BenchmarkGrid.tsx      # Table comparing benchmarks across models
    use-case/
      RecommenderWizard.tsx  # Multi-step question flow (client component)
      ResultCard.tsx         # Recommendation result display
  data/
    plans.ts                 # Subscription plan data
    models.ts                # AI model data
    free-models.ts           # Open-weight / self-hosted model data
    use-cases.ts             # Recommender questions + recommendation rules
  lib/
    recommender.ts           # Pure function: answers → Recommendation | null
  types/
    index.ts                 # Shared TypeScript types
```

---

## Task 1: Project Scaffold & Test Setup

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts` (via create-next-app)
- Modify: `next.config.ts`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Scaffold the Next.js project**

Run from `C:/Users/timjh/projects/ai-value`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```
If prompted about the directory not being empty, confirm to proceed. Accept all defaults when asked.

Expected: `node_modules/` appears, `src/app/` is created, `package.json` is present.

- [ ] **Step 2: Configure static export**

Replace the contents of `next.config.ts`:
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 3: Install test dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: packages added to `devDependencies` in `package.json`.

- [ ] **Step 4: Write jest.config.ts**

Create `jest.config.ts` in the project root:
```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 5: Write jest.setup.ts**

Create `jest.setup.ts` in the project root:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test scripts to package.json**

In `package.json`, add to the `"scripts"` section:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 7: Verify Jest works**

```bash
npx jest --passWithNoTests
```
Expected: `Test Suites: 0 skipped, 0 total` with exit code 0.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with static export and Jest"
```

---

## Task 2: TypeScript Types

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Write the types file**

Create `src/types/index.ts`:
```ts
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors, exits with code 0.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add shared TypeScript types"
```

---

## Task 3: Sample Data Files

**Files:**
- Create: `src/data/plans.ts`
- Create: `src/data/models.ts`
- Create: `src/data/free-models.ts`
- Create: `src/data/use-cases.ts`

- [ ] **Step 1: Create src/data/plans.ts**

```ts
import { Plan } from '@/types'

export const plans: Plan[] = [
  {
    provider: 'OpenAI',
    providerSlug: 'openai',
    accentColor: '#10a37f',
    name: 'ChatGPT Plus',
    price: 20,
    tier: 'plus',
    models: ['GPT-4o', 'GPT-4o mini'],
    features: [
      'Access to GPT-4o',
      'Advanced data analysis',
      'Image generation (DALL·E 3)',
      'Custom GPTs',
      'Web browsing',
    ],
    bestFor: ['Writing', 'Research', 'Coding'],
    limits: { messages: 80, period: '3 hours' },
  },
  {
    provider: 'Anthropic',
    providerSlug: 'anthropic',
    accentColor: '#d97757',
    name: 'Claude Pro',
    price: 20,
    tier: 'pro',
    models: ['Claude 3.5 Sonnet', 'Claude 3.5 Haiku', 'Claude 3 Opus'],
    features: [
      'Access to all Claude models',
      '5× more usage than free tier',
      'Priority access during peak times',
      'Projects & document uploads',
    ],
    bestFor: ['Coding', 'Agents', 'Writing', 'Research'],
    limits: { messages: 45, period: 'hour' },
  },
  {
    provider: 'Google',
    providerSlug: 'google',
    accentColor: '#4285f4',
    name: 'Gemini Advanced',
    price: 19.99,
    pricingNote: 'Included in Google One AI Premium',
    tier: 'plus',
    models: ['Gemini 1.5 Pro', 'Gemini 1.5 Flash'],
    features: [
      'Access to Gemini 1.5 Pro',
      '2M token context window',
      'Google Workspace integration',
      'NotebookLM Plus',
    ],
    bestFor: ['Research', 'Writing', 'Long documents'],
  },
]
```

- [ ] **Step 2: Create src/data/models.ts**

```ts
import { Model } from '@/types'

export const models: Model[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    releaseDate: '2024-05',
    contextWindow: 128000,
    benchmarks: { mmlu: 88.7, humaneval: 90.2, gpqa: 53.6 },
    capabilities: ['Vision', 'Code', 'Function calling', 'JSON mode'],
    bestFor: ['Coding', 'Research', 'Vision tasks'],
    accessedVia: ['ChatGPT Plus', 'ChatGPT Team'],
    apiPricing: { inputPer1M: 2.5, outputPer1M: 10 },
  },
  {
    id: 'claude-35-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    releaseDate: '2024-10',
    contextWindow: 200000,
    benchmarks: { mmlu: 88.3, humaneval: 93.7, gpqa: 65.0 },
    capabilities: ['Vision', 'Code', 'Function calling', 'Long context'],
    bestFor: ['Coding', 'Agents', 'Long documents'],
    accessedVia: ['Claude Pro', 'Claude Team'],
    apiPricing: { inputPer1M: 3, outputPer1M: 15 },
  },
  {
    id: 'gemini-15-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    releaseDate: '2024-05',
    contextWindow: 2000000,
    benchmarks: { mmlu: 85.9, humaneval: 84.1 },
    capabilities: ['Vision', 'Code', 'Long context', 'Multimodal'],
    bestFor: ['Long documents', 'Research', 'Multimodal tasks'],
    accessedVia: ['Gemini Advanced'],
    apiPricing: { inputPer1M: 3.5, outputPer1M: 10.5 },
  },
]
```

- [ ] **Step 3: Create src/data/free-models.ts**

```ts
import { FreeModel } from '@/types'

export const freeModels: FreeModel[] = [
  {
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    parameters: '70B',
    license: 'Llama Community License',
    contextWindow: 128000,
    selfHostDifficulty: 'medium',
    minVram: '40GB',
    hostingOptions: ['Ollama', 'HuggingFace', 'vLLM'],
    benchmarks: { mmlu: 86.0, humaneval: 88.4 },
    bestFor: ['Coding', 'Research', 'General use'],
  },
  {
    name: 'Mistral 7B Instruct',
    provider: 'Mistral AI',
    parameters: '7B',
    license: 'Apache 2.0',
    contextWindow: 32000,
    selfHostDifficulty: 'easy',
    minVram: '8GB',
    hostingOptions: ['Ollama', 'LM Studio', 'HuggingFace'],
    benchmarks: { mmlu: 64.2, humaneval: 38.0 },
    bestFor: ['General use', 'Experimentation', 'Privacy'],
  },
  {
    name: 'Phi-3 Mini',
    provider: 'Microsoft',
    parameters: '3.8B',
    license: 'MIT',
    contextWindow: 128000,
    selfHostDifficulty: 'easy',
    minVram: '4GB',
    hostingOptions: ['Ollama', 'LM Studio'],
    benchmarks: { mmlu: 69.9, humaneval: 58.1 },
    bestFor: ['Devices with limited VRAM', 'Experimentation'],
  },
]
```

- [ ] **Step 4: Create src/data/use-cases.ts**

```ts
import { Question, Recommendation } from '@/types'

export const questions: Question[] = [
  {
    id: 'primary_use',
    text: 'What will you mainly use AI for?',
    options: [
      { value: 'coding', label: 'Coding & development', description: 'Writing code, debugging, code review' },
      { value: 'writing', label: 'Writing & content', description: 'Emails, essays, creative writing' },
      { value: 'research', label: 'Research & analysis', description: 'Summarising documents, fact-finding' },
      { value: 'agents', label: 'Autonomous agents', description: 'Multi-step tasks, agentic workflows' },
    ],
  },
  {
    id: 'budget',
    text: 'What is your monthly budget?',
    options: [
      { value: 'free', label: 'Free only', description: 'No spend at all' },
      { value: 'low', label: 'Under $25/month' },
      { value: 'mid', label: '$25–$100/month' },
      { value: 'high', label: 'Over $100/month' },
    ],
  },
  {
    id: 'technical',
    text: 'How technical are you?',
    options: [
      { value: 'beginner', label: 'Beginner', description: 'I just want a simple chat interface' },
      { value: 'intermediate', label: 'Intermediate', description: 'I use AI tools regularly' },
      { value: 'advanced', label: 'Advanced', description: 'I use APIs and build with AI' },
    ],
  },
]

export const recommendations: Recommendation[] = [
  {
    conditions: { primary_use: 'coding', budget: 'low' },
    recommendedPlan: 'Claude Pro',
    reasoning: 'Claude 3.5 Sonnet leads coding benchmarks with a 93.7% HumanEval score and a 200K context window that handles large codebases. At $20/month it is the best value for developers.',
    alternatives: ['ChatGPT Plus', 'GitHub Copilot Individual'],
  },
  {
    conditions: { primary_use: 'coding', budget: 'free', technical: 'advanced' },
    recommendedPlan: 'Llama 3.3 70B (self-hosted)',
    reasoning: 'If you have the hardware, Llama 3.3 70B is free, private, and competitive with paid models for coding tasks.',
    alternatives: ['Claude.ai free tier', 'ChatGPT free tier'],
  },
  {
    conditions: { primary_use: 'agents', budget: 'mid' },
    recommendedPlan: 'Claude Pro',
    reasoning: "Claude's 200K context window and strong instruction-following make it the top pick for agentic workflows that need to reason over long chains of steps.",
    alternatives: ['ChatGPT Plus', 'OpenAI API direct'],
  },
  {
    conditions: { primary_use: 'writing', budget: 'low' },
    recommendedPlan: 'ChatGPT Plus',
    reasoning: 'GPT-4o excels at writing tasks and ChatGPT Plus bundles image generation (DALL·E 3), making it excellent value for content creators.',
    alternatives: ['Claude Pro'],
  },
  {
    conditions: { primary_use: 'research', budget: 'low' },
    recommendedPlan: 'Gemini Advanced',
    reasoning: "Gemini 1.5 Pro's 2M token context window is unmatched for long-document research. The Google Workspace integration is a bonus for existing Google users.",
    alternatives: ['Claude Pro', 'ChatGPT Plus'],
  },
  {
    conditions: { budget: 'free' },
    recommendedPlan: 'Claude.ai free tier',
    reasoning: "Claude's free tier provides access to Claude 3.5 Haiku with generous daily limits — the best free AI assistant for most users.",
    alternatives: ['ChatGPT free tier', 'Gemini free tier'],
  },
]
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/data/ src/types/
git commit -m "feat: add data files and types"
```

---

## Task 4: Recommender Logic (TDD)

**Files:**
- Create: `src/lib/__tests__/recommender.test.ts`
- Create: `src/lib/recommender.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/recommender.test.ts`:
```ts
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
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx jest src/lib/__tests__/recommender.test.ts --verbose
```
Expected: FAIL — `Cannot find module '../recommender'`

- [ ] **Step 3: Write the implementation**

Create `src/lib/recommender.ts`:
```ts
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
```

- [ ] **Step 4: Run to verify it passes**

```bash
npx jest src/lib/__tests__/recommender.test.ts --verbose
```
Expected: PASS — 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/
git commit -m "feat: add recommender logic with tests"
```

---

## Task 5: Root Layout, Header & Footer

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/components/layout/__tests__/Header.test.tsx`

- [ ] **Step 1: Write the failing Header test**

Create `src/components/layout/__tests__/Header.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx jest src/components/layout/__tests__/Header.test.tsx --verbose
```
Expected: FAIL — `Cannot find module '../Header'`

- [ ] **Step 3: Write Header.tsx**

Create `src/components/layout/Header.tsx`:
```tsx
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent"
        >
          AI Value
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/pricing" className="hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link href="/models" className="hover:text-gray-900 transition-colors">
            Models
          </Link>
          <Link href="/use-case" className="hover:text-gray-900 transition-colors">
            Find My Plan
          </Link>
        </nav>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Run to verify Header test passes**

```bash
npx jest src/components/layout/__tests__/Header.test.tsx --verbose
```
Expected: PASS — 2 tests pass.

- [ ] **Step 5: Write Footer.tsx**

Create `src/components/layout/Footer.tsx`:
```tsx
export function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-400">
        <p>AI Value — independent comparison of AI subscriptions and models.</p>
        <p className="mt-1">Prices and capabilities change frequently — always verify before subscribing.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 6: Update src/app/globals.css**

Replace contents with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900 antialiased;
  }
}
```

- [ ] **Step 7: Update src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Value — Compare AI Subscriptions & Models',
  description: 'Find the best AI subscription for your needs. Compare pricing, models, and benchmarks across all major AI providers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx src/app/globals.css
git commit -m "feat: add root layout with Header and Footer"
```

---

## Task 6: Shared Components (TDD)

**Files:**
- Create: `src/components/shared/ProviderBadge.tsx`
- Create: `src/components/shared/UseCaseTag.tsx`
- Create: `src/components/shared/BenchmarkBar.tsx`
- Create: `src/components/shared/__tests__/ProviderBadge.test.tsx`
- Create: `src/components/shared/__tests__/UseCaseTag.test.tsx`
- Create: `src/components/shared/__tests__/BenchmarkBar.test.tsx`

- [ ] **Step 1: Write failing tests for shared components**

Create `src/components/shared/__tests__/ProviderBadge.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { ProviderBadge } from '../ProviderBadge'

describe('ProviderBadge', () => {
  it('renders the provider name', () => {
    render(<ProviderBadge name="OpenAI" color="#10a37f" />)
    expect(screen.getByText('OpenAI')).toBeInTheDocument()
  })
})
```

Create `src/components/shared/__tests__/UseCaseTag.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { UseCaseTag } from '../UseCaseTag'

describe('UseCaseTag', () => {
  it('renders the label', () => {
    render(<UseCaseTag label="Coding" />)
    expect(screen.getByText('Coding')).toBeInTheDocument()
  })
})
```

Create `src/components/shared/__tests__/BenchmarkBar.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { BenchmarkBar } from '../BenchmarkBar'

describe('BenchmarkBar', () => {
  it('renders label and score', () => {
    render(<BenchmarkBar label="MMLU" score={88.7} />)
    expect(screen.getByText('MMLU')).toBeInTheDocument()
    expect(screen.getByText('88.7%')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify tests fail**

```bash
npx jest src/components/shared/__tests__/ --verbose
```
Expected: FAIL — 3 modules not found.

- [ ] **Step 3: Write ProviderBadge.tsx**

Create `src/components/shared/ProviderBadge.tsx`:
```tsx
type Props = { name: string; color: string }

export function ProviderBadge({ name, color }: Props) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  )
}
```

- [ ] **Step 4: Write UseCaseTag.tsx**

Create `src/components/shared/UseCaseTag.tsx`:
```tsx
type Props = { label: string }

export function UseCaseTag({ label }: Props) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
      {label}
    </span>
  )
}
```

- [ ] **Step 5: Write BenchmarkBar.tsx**

Create `src/components/shared/BenchmarkBar.tsx`:
```tsx
type Props = { label: string; score: number; maxScore?: number }

export function BenchmarkBar({ label, score, maxScore = 100 }: Props) {
  const pct = Math.min(Math.round((score / maxScore) * 100), 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span>{score}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npx jest src/components/shared/__tests__/ --verbose
```
Expected: PASS — 3 tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/shared/
git commit -m "feat: add shared components (ProviderBadge, UseCaseTag, BenchmarkBar)"
```

---

## Task 7: Home Page

**Files:**
- Create: `src/components/home/NavCard.tsx`
- Create: `src/components/home/__tests__/NavCard.test.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write the failing NavCard test**

Create `src/components/home/__tests__/NavCard.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { NavCard } from '../NavCard'

describe('NavCard', () => {
  it('renders title, subtitle and links to href', () => {
    render(
      <NavCard
        icon="💰"
        title="Compare Pricing"
        subtitle="Side-by-side plan comparison."
        href="/pricing"
        gradient="linear-gradient(135deg, #f0fdf4, #dcfce7)"
      />
    )
    expect(screen.getByText('Compare Pricing')).toBeInTheDocument()
    expect(screen.getByText('Side-by-side plan comparison.')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/pricing')
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx jest src/components/home/__tests__/NavCard.test.tsx --verbose
```
Expected: FAIL — `Cannot find module '../NavCard'`

- [ ] **Step 3: Write NavCard.tsx**

Create `src/components/home/NavCard.tsx`:
```tsx
import Link from 'next/link'

type Props = {
  icon: string
  title: string
  subtitle: string
  href: string
  gradient: string
}

export function NavCard({ icon, title, subtitle, href, gradient }: Props) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      style={{ background: gradient }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors">
        {title}
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed">{subtitle}</p>
    </Link>
  )
}
```

- [ ] **Step 4: Run to verify NavCard test passes**

```bash
npx jest src/components/home/__tests__/NavCard.test.tsx --verbose
```
Expected: PASS — 1 test passes.

- [ ] **Step 5: Write src/app/page.tsx**

Replace the contents of `src/app/page.tsx`:
```tsx
import { NavCard } from '@/components/home/NavCard'

const sections = [
  {
    icon: '💰',
    title: 'Compare Pricing',
    subtitle: 'Side-by-side plan comparison across all major AI providers. Find the best value for your tier.',
    href: '/pricing',
    gradient: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
  },
  {
    icon: '🤖',
    title: 'Explore Models',
    subtitle: 'Benchmarks, context windows, and capabilities for every major AI model in one place.',
    href: '/models',
    gradient: 'linear-gradient(135deg, #f0f9ff, #dbeafe)',
  },
  {
    icon: '🆓',
    title: 'Free & Open Source',
    subtitle: 'The best free and self-hostable models. No subscription required.',
    href: '/models/free',
    gradient: 'linear-gradient(135deg, #fdf4ff, #ede9fe)',
  },
  {
    icon: '🎯',
    title: 'Find Your Plan',
    subtitle: 'Answer a few questions and get a personalised AI recommendation with reasoning.',
    href: '/use-case',
    gradient: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
  },
]

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Find the right AI for you
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Compare subscriptions, models, and benchmarks across every major AI provider.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {sections.map(s => (
          <NavCard key={s.href} {...s} />
        ))}
      </div>
    </main>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: add home page with NavCards"
```

---

## Task 8: Pricing Page (TDD)

**Files:**
- Create: `src/components/pricing/PlanCard.tsx`
- Create: `src/components/pricing/PricingFilter.tsx`
- Create: `src/components/pricing/PricingPageClient.tsx`
- Create: `src/app/pricing/page.tsx`
- Create: `src/components/pricing/__tests__/PlanCard.test.tsx`
- Create: `src/components/pricing/__tests__/PricingFilter.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/pricing/__tests__/PlanCard.test.tsx`:
```tsx
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
```

Create `src/components/pricing/__tests__/PricingFilter.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run to verify tests fail**

```bash
npx jest src/components/pricing/__tests__/ --verbose
```
Expected: FAIL — modules not found.

- [ ] **Step 3: Write PlanCard.tsx**

Create `src/components/pricing/PlanCard.tsx`:
```tsx
import { Plan } from '@/types'
import { ProviderBadge } from '@/components/shared/ProviderBadge'
import { UseCaseTag } from '@/components/shared/UseCaseTag'

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
      style={{ borderTopColor: plan.accentColor, borderTopWidth: 4 }}
    >
      <ProviderBadge name={plan.provider} color={plan.accentColor} />
      <h3 className="mt-3 text-lg font-bold text-gray-900">{plan.name}</h3>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">
          {plan.price === 0 ? 'Free' : `$${plan.price}`}
        </span>
        {plan.price > 0 && <span className="text-sm text-gray-500">/mo</span>}
      </div>
      {plan.pricingNote && (
        <p className="text-xs text-gray-400 mt-0.5">{plan.pricingNote}</p>
      )}
      <ul className="mt-4 space-y-1.5 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {plan.bestFor.map(tag => (
          <UseCaseTag key={tag} label={tag} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Write PricingFilter.tsx**

Create `src/components/pricing/PricingFilter.tsx`:
```tsx
'use client'

type Props = {
  tags: string[]
  selected: string | null
  onChange: (tag: string | null) => void
}

export function PricingFilter({ tags, selected, onChange }: Props) {
  const base = 'rounded-full px-4 py-1.5 text-sm font-medium transition-colors'
  const active = 'bg-violet-600 text-white'
  const inactive = 'bg-gray-100 text-gray-700 hover:bg-gray-200'

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`${base} ${selected === null ? active : inactive}`}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onChange(tag)}
          className={`${base} ${selected === tag ? active : inactive}`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Write PricingPageClient.tsx**

Create `src/components/pricing/PricingPageClient.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { Plan } from '@/types'
import { PlanCard } from './PlanCard'
import { PricingFilter } from './PricingFilter'

type Props = { plans: Plan[]; allTags: string[] }

export function PricingPageClient({ plans, allTags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const filtered = activeTag ? plans.filter(p => p.bestFor.includes(activeTag)) : plans

  return (
    <>
      <PricingFilter tags={allTags} selected={activeTag} onChange={setActiveTag} />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(plan => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No plans match this filter.</p>
      )}
    </>
  )
}
```

- [ ] **Step 6: Write src/app/pricing/page.tsx**

Create `src/app/pricing/page.tsx`:
```tsx
import { plans } from '@/data/plans'
import { PricingPageClient } from '@/components/pricing/PricingPageClient'

export const metadata = {
  title: 'AI Pricing Plans — AI Value',
  description: 'Compare AI subscription plans across all major providers. Filter by use case to find the best value.',
}

export default function PricingPage() {
  const allTags = Array.from(new Set(plans.flatMap(p => p.bestFor))).sort()
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Pricing Plans</h1>
      <p className="text-xl text-gray-500 mb-10">
        Compare plans across all major AI providers. Filter by what you need it for.
      </p>
      <PricingPageClient plans={plans} allTags={allTags} />
    </main>
  )
}
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
npx jest src/components/pricing/__tests__/ --verbose
```
Expected: PASS — 7 tests pass.

- [ ] **Step 8: Commit**

```bash
git add src/components/pricing/ src/app/pricing/
git commit -m "feat: add pricing page with filterable plan cards"
```

---

## Task 9: Models Page (TDD)

**Files:**
- Create: `src/components/models/ModelCard.tsx`
- Create: `src/components/models/BenchmarkGrid.tsx`
- Create: `src/app/models/page.tsx`
- Create: `src/components/models/__tests__/ModelCard.test.tsx`
- Create: `src/components/models/__tests__/BenchmarkGrid.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/models/__tests__/ModelCard.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { ModelCard } from '../ModelCard'
import { Model } from '@/types'

const model: Model = {
  id: 'gpt-4o',
  name: 'GPT-4o',
  provider: 'OpenAI',
  releaseDate: '2024-05',
  contextWindow: 128000,
  benchmarks: { mmlu: 88.7 },
  capabilities: ['Vision', 'Code'],
  bestFor: ['Coding'],
  accessedVia: ['ChatGPT Plus'],
}

describe('ModelCard', () => {
  it('renders model name and provider', () => {
    render(<ModelCard model={model} />)
    expect(screen.getByText('GPT-4o')).toBeInTheDocument()
    expect(screen.getByText('OpenAI')).toBeInTheDocument()
  })

  it('renders context window in K format', () => {
    render(<ModelCard model={model} />)
    expect(screen.getByText('128K ctx')).toBeInTheDocument()
  })

  it('renders capabilities as tags', () => {
    render(<ModelCard model={model} />)
    expect(screen.getByText('Vision')).toBeInTheDocument()
    expect(screen.getByText('Code')).toBeInTheDocument()
  })
})
```

Create `src/components/models/__tests__/BenchmarkGrid.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { BenchmarkGrid } from '../BenchmarkGrid'
import { Model } from '@/types'

const models: Model[] = [
  {
    id: 'model-a',
    name: 'Model A',
    provider: 'Provider A',
    releaseDate: '2024-01',
    contextWindow: 128000,
    benchmarks: { mmlu: 88.7 },
    capabilities: [],
    bestFor: [],
    accessedVia: [],
  },
]

describe('BenchmarkGrid', () => {
  it('renders model names', () => {
    render(<BenchmarkGrid models={models} />)
    expect(screen.getByText('Model A')).toBeInTheDocument()
  })

  it('renders benchmark column headers', () => {
    render(<BenchmarkGrid models={models} />)
    expect(screen.getByText('MMLU')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify tests fail**

```bash
npx jest src/components/models/__tests__/ --verbose
```
Expected: FAIL — modules not found.

- [ ] **Step 3: Write ModelCard.tsx**

Create `src/components/models/ModelCard.tsx`:
```tsx
import { Model } from '@/types'
import { BenchmarkBar } from '@/components/shared/BenchmarkBar'
import { UseCaseTag } from '@/components/shared/UseCaseTag'

export function ModelCard({ model }: { model: Model }) {
  const benchmarkEntries = Object.entries(model.benchmarks).filter(
    (entry): entry is [string, number] => entry[1] !== undefined
  )

  return (
    <div className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{model.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{model.provider}</p>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1 whitespace-nowrap">
          {(model.contextWindow / 1000).toFixed(0)}K ctx
        </span>
      </div>
      {benchmarkEntries.length > 0 && (
        <div className="space-y-2 mb-4">
          {benchmarkEntries.map(([key, val]) => (
            <BenchmarkBar key={key} label={key.toUpperCase()} score={val} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {model.capabilities.map(c => (
          <UseCaseTag key={c} label={c} />
        ))}
      </div>
      {model.apiPricing && (
        <p className="mt-3 text-xs text-gray-400">
          API: ${model.apiPricing.inputPer1M}/1M in · ${model.apiPricing.outputPer1M}/1M out
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Write BenchmarkGrid.tsx**

Create `src/components/models/BenchmarkGrid.tsx`:
```tsx
import { Model } from '@/types'

export function BenchmarkGrid({ models }: { models: Model[] }) {
  const allBenchmarks = Array.from(
    new Set(
      models.flatMap(m =>
        Object.entries(m.benchmarks)
          .filter(([, v]) => v !== undefined)
          .map(([k]) => k)
      )
    )
  )

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Model</th>
            {allBenchmarks.map(b => (
              <th
                key={b}
                className="text-right py-3 px-3 font-semibold text-gray-500 uppercase text-xs tracking-wide"
              >
                {b}
              </th>
            ))}
            <th className="text-right py-3 px-4 font-semibold text-gray-500 uppercase text-xs tracking-wide">
              Context
            </th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, i) => (
            <tr
              key={model.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                i === models.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <td className="py-3 px-4">
                <p className="font-semibold text-gray-900">{model.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{model.provider}</p>
              </td>
              {allBenchmarks.map(b => (
                <td key={b} className="text-right py-3 px-3 text-gray-700">
                  {model.benchmarks[b] !== undefined ? `${model.benchmarks[b]}%` : '—'}
                </td>
              ))}
              <td className="text-right py-3 px-4 text-gray-700">
                {(model.contextWindow / 1000).toFixed(0)}K
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 5: Write src/app/models/page.tsx**

Create `src/app/models/page.tsx`:
```tsx
import Link from 'next/link'
import { models } from '@/data/models'
import { ModelCard } from '@/components/models/ModelCard'
import { BenchmarkGrid } from '@/components/models/BenchmarkGrid'

export const metadata = {
  title: 'AI Models Comparison — AI Value',
  description: 'Compare AI models by benchmarks, context window, and capabilities.',
}

export default function ModelsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Models</h1>
          <p className="text-xl text-gray-500">
            Benchmarks, context windows, and capabilities — all in one place.
          </p>
        </div>
        <Link
          href="/models/free"
          className="rounded-xl bg-violet-50 border border-violet-200 px-4 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-100 transition-colors whitespace-nowrap"
        >
          🆓 Free & Open Source →
        </Link>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Benchmark Comparison</h2>
        <BenchmarkGrid models={models} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Model Details</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {models.map(model => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npx jest src/components/models/__tests__/ --verbose
```
Expected: PASS — 5 tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/models/ src/app/models/
git commit -m "feat: add models page with BenchmarkGrid and ModelCards"
```

---

## Task 10: Free Models Sub-page

**Files:**
- Create: `src/app/models/free/page.tsx`
- Create: `src/app/models/free/__tests__/page.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/app/models/free/__tests__/page.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import FreeModelsPage from '../page'

describe('FreeModelsPage', () => {
  it('renders the page heading', () => {
    render(<FreeModelsPage />)
    expect(screen.getByRole('heading', { name: /free/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx jest src/app/models/free/__tests__/page.test.tsx --verbose
```
Expected: FAIL — `Cannot find module '../page'`

- [ ] **Step 3: Write src/app/models/free/page.tsx**

Create `src/app/models/free/page.tsx`:
```tsx
import Link from 'next/link'
import { freeModels } from '@/data/free-models'
import { UseCaseTag } from '@/components/shared/UseCaseTag'
import { BenchmarkBar } from '@/components/shared/BenchmarkBar'

export const metadata = {
  title: 'Free & Self-Hosted AI Models — AI Value',
  description: 'The best free and open-weight AI models you can run locally.',
}

const difficultyLabel: Record<string, string> = {
  easy: '🟢 Easy',
  medium: '🟡 Medium',
  hard: '🔴 Hard',
}

export default function FreeModelsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-4">
        <Link href="/models" className="text-sm text-violet-600 hover:underline">
          ← All Models
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Free & Open Source Models</h1>
      <p className="text-xl text-gray-500 mb-10">
        High-quality models you can run locally or access for free. No subscription needed.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {freeModels.map(model => {
          const benchmarkEntries = Object.entries(model.benchmarks).filter(
            (entry): entry is [string, number] => entry[1] !== undefined
          )
          return (
            <div key={model.name} className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{model.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{model.provider} · {model.parameters}</p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1">
                  {(model.contextWindow / 1000).toFixed(0)}K ctx
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600">
                  {difficultyLabel[model.selfHostDifficulty]} to self-host
                </span>
                {model.minVram && (
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600">
                    {model.minVram} VRAM
                  </span>
                )}
                <span className="rounded-full bg-green-50 border border-green-200 px-2.5 py-0.5 text-green-700">
                  {model.license}
                </span>
              </div>

              {benchmarkEntries.length > 0 && (
                <div className="space-y-2 mb-4">
                  {benchmarkEntries.map(([key, val]) => (
                    <BenchmarkBar key={key} label={key.toUpperCase()} score={val} />
                  ))}
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                  Run with
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {model.hostingOptions.map(h => (
                    <span key={h} className="rounded-md bg-blue-50 border border-blue-100 px-2 py-0.5 text-xs text-blue-700">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {model.bestFor.map(tag => (
                  <UseCaseTag key={tag} label={tag} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest src/app/models/free/__tests__/page.test.tsx --verbose
```
Expected: PASS — 1 test passes.

- [ ] **Step 5: Commit**

```bash
git add src/app/models/free/
git commit -m "feat: add free and self-hosted models sub-page"
```

---

## Task 11: Use Case Recommender Page (TDD)

**Files:**
- Create: `src/components/use-case/ResultCard.tsx`
- Create: `src/components/use-case/RecommenderWizard.tsx`
- Create: `src/app/use-case/page.tsx`
- Create: `src/components/use-case/__tests__/RecommenderWizard.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/use-case/__tests__/RecommenderWizard.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run to verify tests fail**

```bash
npx jest src/components/use-case/__tests__/RecommenderWizard.test.tsx --verbose
```
Expected: FAIL — `Cannot find module '../RecommenderWizard'`

- [ ] **Step 3: Write ResultCard.tsx**

Create `src/components/use-case/ResultCard.tsx`:
```tsx
import { Recommendation } from '@/types'
import { UseCaseTag } from '@/components/shared/UseCaseTag'

type Props = {
  result: Recommendation | null
  onReset: () => void
}

export function ResultCard({ result, onReset }: Props) {
  if (!result) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <p className="text-gray-600 mb-4">
          We couldn&apos;t find a perfect match — explore our{' '}
          <a href="/pricing" className="text-violet-600 underline">
            pricing page
          </a>{' '}
          for all options.
        </p>
        <button onClick={onReset} className="text-sm text-violet-600 hover:underline">
          Start over
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 p-8">
        <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">
          Best value for you
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{result.recommendedPlan}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{result.reasoning}</p>
        {result.alternatives.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">Also consider</p>
            <div className="flex flex-wrap gap-2">
              {result.alternatives.map(alt => (
                <UseCaseTag key={alt} label={alt} />
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onReset}
        className="mt-4 text-sm text-violet-600 hover:underline"
      >
        Start over
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Write RecommenderWizard.tsx**

Create `src/components/use-case/RecommenderWizard.tsx`:
```tsx
'use client'

import { useState } from 'react'
import { Question, Recommendation } from '@/types'
import { findRecommendation } from '@/lib/recommender'
import { ResultCard } from './ResultCard'

type Props = {
  questions: Question[]
  recommendations: Recommendation[]
}

export function RecommenderWizard({ questions, recommendations }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Recommendation | null | undefined>(undefined)

  const currentQuestion = questions[step]

  function handleAnswer(value: string) {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setResult(findRecommendation(newAnswers, recommendations))
    }
  }

  if (result !== undefined) {
    return (
      <ResultCard
        result={result}
        onReset={() => {
          setStep(0)
          setAnswers({})
          setResult(undefined)
        }}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex gap-1.5 mb-3">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-violet-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500">
          Question {step + 1} of {questions.length}
        </p>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentQuestion.text}</h2>
      <div className="space-y-3">
        {currentQuestion.options.map(opt => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className="w-full text-left rounded-xl border border-gray-200 p-4 hover:border-violet-400 hover:bg-violet-50 transition-colors"
          >
            <p className="font-semibold text-gray-900">{opt.label}</p>
            {opt.description && (
              <p className="text-sm text-gray-500 mt-0.5">{opt.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Write src/app/use-case/page.tsx**

Create `src/app/use-case/page.tsx`:
```tsx
import { questions, recommendations } from '@/data/use-cases'
import { RecommenderWizard } from '@/components/use-case/RecommenderWizard'

export const metadata = {
  title: 'Find Your AI Plan — AI Value',
  description: 'Answer a few questions to get a personalised AI subscription recommendation.',
}

export default function UseCasePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Find Your Best Value</h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Answer a few quick questions and we&apos;ll recommend the AI subscription that fits you best.
        </p>
      </div>
      <RecommenderWizard questions={questions} recommendations={recommendations} />
    </main>
  )
}
```

- [ ] **Step 6: Run tests to verify they pass**

```bash
npx jest src/components/use-case/__tests__/RecommenderWizard.test.tsx --verbose
```
Expected: PASS — 4 tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/use-case/ src/app/use-case/
git commit -m "feat: add use-case recommender page with wizard and result card"
```

---

## Task 12: Build Verification & CLAUDE.md Update

**Files:**
- Modify: `CLAUDE.md`
- Modify: `.gitignore`

- [ ] **Step 1: Run the full test suite**

```bash
npx jest --verbose
```
Expected: All tests pass, 0 failures.

- [ ] **Step 2: Run the production build**

```bash
npm run build
```
Expected: Build completes with no errors. An `out/` directory is created containing static HTML.

- [ ] **Step 3: Add out/ and .superpowers/ to .gitignore**

Add to `.gitignore`:
```
out/
.superpowers/
```

- [ ] **Step 4: Update CLAUDE.md**

Replace the contents of `CLAUDE.md`:
```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server at http://localhost:3000
- `npm run build` — static export to `out/` (required before deploying)
- `npm test` — run Jest test suite
- `npm test -- --testPathPattern=<path>` — run a single test file
- `npx tsc --noEmit` — typecheck without building

## Architecture

Next.js 14 App Router, Tailwind CSS, TypeScript. Fully static via `output: 'export'` in `next.config.ts` — no server runtime.

**Populating content:** Edit files in `src/data/` only. No component code changes needed.

- `src/data/plans.ts` — subscription plans (price, features, bestFor tags)
- `src/data/models.ts` — AI models (benchmarks, context window, capabilities)
- `src/data/free-models.ts` — open-weight / self-hostable models
- `src/data/use-cases.ts` — recommender questions and match conditions

**Recommender logic:** `src/lib/recommender.ts` — pure function, matches answers to conditions. Most-specific conditions win. Add rules to `data/use-cases.ts` without touching the function.

## Pages

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/pricing` | `src/app/pricing/page.tsx` |
| `/models` | `src/app/models/page.tsx` |
| `/models/free` | `src/app/models/free/page.tsx` |
| `/use-case` | `src/app/use-case/page.tsx` |

## Key Types

All in `src/types/index.ts`: `Plan`, `Model`, `FreeModel`, `Question`, `Recommendation`.
```

- [ ] **Step 5: Final commit**

```bash
git add CLAUDE.md .gitignore
git commit -m "chore: update CLAUDE.md with dev commands and architecture"
```

- [ ] **Step 6: Verify the dev server starts**

```bash
npm run dev
```
Expected: `ready - started server on 0.0.0.0:3000` (or similar). Open http://localhost:3000 to confirm the home page loads.
