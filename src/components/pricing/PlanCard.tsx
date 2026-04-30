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
