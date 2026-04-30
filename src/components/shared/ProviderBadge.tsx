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
