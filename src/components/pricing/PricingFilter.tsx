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
