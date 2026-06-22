'use client'

import { useState } from 'react'
import { Star, X } from 'lucide-react'
import clsx from 'clsx'
import Button from '@/components/ui/Button'

interface EvalMember {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
}

interface MemberEvaluation {
  targetId: string
  consistency: number
  effort: number
  comment: string
}

interface EvaluationFormProps {
  members: EvalMember[]
  currentUserId: string
  weekNumber: number
  pointsBalance: number
  weekCost: number
  onSubmit: (evaluations: MemberEvaluation[]) => void
  onClose: () => void
}

function StarSelector({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="mb-5">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className="transition-all duration-200 hover:scale-110"
          >
            <Star
              size={28}
              className={star <= value ? 'fill-[#FF6B35] text-[#FF6B35]' : 'fill-[#1E1E2E] text-[#1E1E2E]'}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function EvaluationForm({ members, currentUserId, weekNumber, pointsBalance, weekCost, onSubmit, onClose }: EvaluationFormProps) {
  const [step, setStep] = useState(0)
  const [evaluations, setEvaluations] = useState<MemberEvaluation[]>([])

  const others = members.filter((m) => m.id !== currentUserId)
  const current = others[step]
  const currentEval = evaluations[step] || { targetId: current?.id, consistency: 0, effort: 0, comment: '' }

  function update(field: keyof MemberEvaluation, value: number | string) {
    const updated = [...evaluations]
    const entry = { ...currentEval, [field]: value }
    updated[step] = entry
    setEvaluations(updated)
  }

  function handleNext() {
    if (step < others.length - 1) {
      setStep((s) => s + 1)
    }
  }

  function handleSubmit() {
    const all = evaluations.map((e, i) => ({
      targetId: others[i].id,
      consistency: e.consistency || 0,
      effort: e.effort || 0,
      comment: e.comment || '',
    }))
    onSubmit(all)
  }

  if (!current) return null

  const canProceed = currentEval.consistency > 0 && currentEval.effort > 0
  const isLast = step === others.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[#FF6B35] font-semibold">{pointsBalance} pts</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-400 text-sm">Cost: {weekCost} pts</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#1E1E2E] flex items-center justify-center text-sm font-semibold text-white">
            {current.avatar_url ? (
              <img src={current.avatar_url} alt={current.username} className="w-full h-full rounded-full object-cover" />
            ) : (
              current.username.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <p className="text-white font-semibold">{current.full_name || current.username}</p>
            <p className="text-gray-500 text-xs">@{current.username}</p>
          </div>
        </div>

        <p className="text-gray-500 text-xs mb-4">Week {weekNumber} Evaluation</p>

        <StarSelector value={currentEval.consistency} onChange={(v) => update('consistency', v)} label="Consistency (showed up?)" />
        <StarSelector value={currentEval.effort} onChange={(v) => update('effort', v)} label="Effort (gave it all?)" />

        <div className="mb-6">
          <label className="text-sm text-gray-400 mb-2 block">Comment (optional)</label>
          <textarea
            value={currentEval.comment}
            onChange={(e) => update('comment', e.target.value)}
            placeholder="How did they do this week?"
            rows={3}
            className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-[#FF6B35] resize-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Member {step + 1}/{others.length}</span>
          {isLast ? (
            <Button variant="primary" size="md" disabled={!canProceed} onClick={handleSubmit}>
              Submit All
            </Button>
          ) : (
            <Button variant="primary" size="md" disabled={!canProceed} onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
