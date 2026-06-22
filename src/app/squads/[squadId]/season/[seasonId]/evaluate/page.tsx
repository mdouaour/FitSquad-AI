'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import EvaluationForm from '@/components/season/EvaluationForm'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface MemberEvaluation {
  targetId: string
  consistency: number
  effort: number
  comment: string
}

const DEMO_MEMBERS = [
  { id: 'user-2', username: 'sara_fit', full_name: 'Sara', avatar_url: null },
  { id: 'user-3', username: 'karim_kb', full_name: 'Karim', avatar_url: null },
  { id: 'user-4', username: 'lina_run', full_name: 'Lina', avatar_url: null },
  { id: 'user-5', username: 'omar_fit', full_name: 'Omar', avatar_url: null },
]

export default function EvaluatePage() {
  const params = useParams()
  const router = useRouter()
  const squadId = params.squadId as string
  const seasonId = params.seasonId as string

  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(_evaluations: MemberEvaluation[]) {
    setSubmitted(true)
    setShowForm(false)
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#00D68F]/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#00D68F]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Evaluation Submitted!</h2>
          <p className="text-gray-400 mb-6">
            Your weekly evaluations have been recorded.
          </p>
          <Link href={`/squads/${squadId}`}>
            <Button variant="primary" size="lg" className="w-full">
              Back to Squad
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/squads/${squadId}/season/${seasonId}`}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Season
      </Link>

      {!showForm ? (
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Weekly Evaluation</h1>
          <p className="text-gray-400 text-sm mb-6">Week 3</p>

          <div className="bg-[#0A0A0F] rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Points Balance</span>
              <span className="text-[#FF6B35] font-bold text-lg">120 pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Week Cost</span>
              <span className="text-gray-300 font-semibold">20 pts</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-4">
            Evaluate {DEMO_MEMBERS.length} squad members for this week.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setShowForm(true)}
          >
            Start Evaluation
          </Button>
        </Card>
      ) : (
        <EvaluationForm
          members={DEMO_MEMBERS}
          currentUserId="user-1"
          weekNumber={3}
          pointsBalance={120}
          weekCost={20}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
