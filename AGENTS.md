<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Overview

**AI Value** — Static website comparing AI subscription plans, models, benchmarks, and providing personalised recommendations.

- **Framework:** Next.js 16 static export (`output: 'export'`)
- **Stack:** React 19, TypeScript, Tailwind CSS v4
- **Testing:** Jest 30 + React Testing Library
- **Deployment:** Fully static (no server runtime)

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Static export build |
| `npm run lint` | ESLint |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Jest in watch mode |

## Architecture

- **No CMS, no database** — all content is TypeScript data files in `src/data/`
- **Static generation only** — no `use client` is fine, but recommender wizard uses client components
- **Path alias** `@/*` maps to `./src/*`
- **Tailwind CSS v4** uses `@import "tailwindcss"` (no `tailwind.config.ts` needed)

## Documentation

- **Design spec:** [`docs/superpowers/specs/2026-04-30-ai-value-website-design.md`](./docs/superpowers/specs/2026-04-30-ai-value-website-design.md)
- **Implementation plan:** [`docs/superpowers/plans/2026-04-30-ai-value-website.md`](./docs/superpowers/plans/2026-04-30-ai-value-website.md)

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Home — hero + NavCards |
| `/pricing` | `src/app/pricing/page.tsx` | Pricing plans with filter |
| `/models` | `src/app/models/page.tsx` | Model comparison with BenchmarkGrid + ModelCards |
| `/models/free` | `src/app/models/free/page.tsx` | Free & self-hosted models |
| `/use-case` | `src/app/use-case/page.tsx` | Interactive recommender wizard |

## Components

| Component | File | Purpose |
|---|---|---|
| `Header` | `src/components/layout/Header.tsx` | Sticky nav bar |
| `Footer` | `src/components/layout/Footer.tsx` | Simple footer |
| `NavCard` | `src/components/home/NavCard.tsx` | Home page section card |
| `PlanCard` | `src/components/pricing/PlanCard.tsx` | Plan display with price, features, tags |
| `PricingFilter` | `src/components/pricing/PricingFilter.tsx` | Tag filter buttons (client) |
| `PricingPageClient` | `src/components/pricing/PricingPageClient.tsx` | Client wrapper for filter state |
| `ModelCard` | `src/components/models/ModelCard.tsx` | Model details with benchmarks |
| `BenchmarkGrid` | `src/components/models/BenchmarkGrid.tsx` | Side-by-side benchmark table |
| `RecommenderWizard` | `src/components/use-case/RecommenderWizard.tsx` | Multi-step question flow (client) |
| `ResultCard` | `src/components/use-case/ResultCard.tsx` | Recommendation result display |
| `ProviderBadge` | `src/components/shared/ProviderBadge.tsx` | Coloured provider chip |
| `UseCaseTag` | `src/components/shared/UseCaseTag.tsx` | Grey pill tag |
| `BenchmarkBar` | `src/components/shared/BenchmarkBar.tsx` | Horizontal benchmark bar |

## Data Files (`src/data/`)

| File | Type | Purpose |
|---|---|---|
| `plans.ts` | `Plan[]` | Subscription plans — price, features, bestFor tags |
| `models.ts` | `Model[]` | AI models — benchmarks, context window, capabilities |
| `free-models.ts` | `FreeModel[]` | Open-weight / self-hostable models |
| `use-cases.ts` | `Question[]`, `Recommendation[]` | Recommender questions + match conditions |

## Recommender Logic

`src/lib/recommender.ts` — pure function `findRecommendation(answers, recommendations)`:
- Sorts by most-specific conditions first (most keys wins)
- Returns first match or `null`
- Add rules to `data/use-cases.ts` without touching the function

## Key Types (`src/types/index.ts`)

`Plan`, `Model`, `FreeModel`, `Question`, `Recommendation`

## Conventions

- Components in `src/components/{section}/` and `src/components/shared/`
- Data files in `src/data/` (plans, models, free-models, use-cases)
- Types in `src/types/index.ts`
- Pure function logic in `src/lib/`
- Prefer Tailwind utility classes; keep CSS minimal
- Provider accent colours defined per-plan in data files, applied via inline styles
- Use `<ProviderBadge>`, `<UseCaseTag>`, `<BenchmarkBar>` shared components for consistency
