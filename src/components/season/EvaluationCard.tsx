'use client'

import { Star } from 'lucide-react'
import Card from '@/components/ui/Card'

interface EvaluationCardProps {
  username: string
  full_name: string | null
  avgConsistency: number
  avgEffort: number
  evaluationCount: number
}

function StarDisplay({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1.5">{label}</p>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = value >= star ? 'full' : value >= star - 0.5 ? 'half' : 'empty'
          return (
            <Star
              key={star}
              size={22}
              className={
                fill === 'full'
                  ? 'fill-[#FF6B35] text-[#FF6B35]'
                  : fill === 'half'
                  ? 'fill-[#FF6B35]/50 text-[#FF6B35]'
                  : 'fill-[#1E1E2E] text-[#1E1E2E]'
              }
            />
          )
        })}
        <span className="ml-2 text-white font-semibold text-sm">{value.toFixed(1)}</span>
      </div>
    </div>
  )
}

export default function EvaluationCard({ username, full_name, avgConsistency, avgEffort, evaluationCount }: EvaluationCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#1E1E2E] flex items-center justify-center text-sm font-semibold text-white">
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-white font-semibold">{full_name || username}</p>
          <p className="text-gray-500 text-xs">@{username}</p>
        </div>
      </div>
      <div className="space-y-3">
        <StarDisplay value={avgConsistency} label="Consistency" />
        <StarDisplay value={avgEffort} label="Effort" />
      </div>
      <p className="text-gray-500 text-xs mt-3">Based on {evaluationCount} evaluation{evaluationCount !== 1 ? 's' : ''}</p>
    </Card>
  )
}
