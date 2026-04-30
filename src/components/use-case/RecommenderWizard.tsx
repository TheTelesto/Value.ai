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
