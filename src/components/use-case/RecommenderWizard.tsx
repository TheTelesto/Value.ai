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
    <div style={{ maxWidth: '560px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          {questions.map((_, i) => (
            <div
              key={i}
              style={{
                height: '4px', flex: 1, borderRadius: '2px',
                background: i <= step ? 'var(--electric)' : 'var(--bg-4)',
                transition: 'background 220ms',
              }}
            />
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--fg-4)' }}>
          Step {step + 1} of {questions.length}
        </p>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '22px',
        color: 'var(--fg-1)', marginBottom: '24px',
      }}>
        {currentQuestion.text}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {currentQuestion.options.map(opt => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            style={{
              width: '100%', textAlign: 'left',
              background: 'var(--bg-2)', color: 'var(--fg-1)',
              border: '1px solid var(--line-2)',
              borderRadius: 'var(--r-3)', padding: '16px 20px',
              cursor: 'pointer',
              transition: 'all 150ms var(--ease-out)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--line-3)'; e.currentTarget.style.background = 'var(--bg-3)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-2)'; e.currentTarget.style.background = 'var(--bg-2)' }}
          >
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px', color: 'var(--fg-1)' }}>{opt.label}</p>
            {opt.description && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--fg-3)', marginTop: '4px' }}>{opt.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
