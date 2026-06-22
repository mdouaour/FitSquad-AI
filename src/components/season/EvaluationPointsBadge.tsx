'use client'

import { Star } from 'lucide-react'
import clsx from 'clsx'

interface EvaluationPointsBadgeProps {
  balance: number
  needed: number
}

export default function EvaluationPointsBadge({ balance, needed }: EvaluationPointsBadgeProps) {
  const sufficient = balance >= needed

  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200',
        sufficient ? 'bg-[#00D68F]/20 text-[#00D68F]' : 'bg-[#EF4444]/20 text-[#EF4444]'
      )}
    >
      <Star size={14} />
      <span>{balance} pts</span>
    </div>
  )
}
