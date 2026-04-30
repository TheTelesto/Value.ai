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
