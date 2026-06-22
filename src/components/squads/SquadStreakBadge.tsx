'use client'

import clsx from 'clsx'

interface SquadStreakBadgeProps {
  currentStreak: number
  longestStreak: number
}

export default function SquadStreakBadge({ currentStreak, longestStreak }: SquadStreakBadgeProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200',
        currentStreak > 0
          ? 'bg-[#00D68F]/10 border-[#00D68F]/30 shadow-[0_0_15px_rgba(0,214,143,0.15)]'
          : 'bg-[#1E1E2E] border-[#1E1E2E]'
      )}
    >
      <span className="text-xl">🔥</span>
      <div>
        <div className={clsx(
          'font-bold text-lg leading-tight',
          currentStreak > 0 ? 'text-[#00D68F]' : 'text-gray-400'
        )}>
          {currentStreak}
        </div>
        <div className="text-xs text-gray-500 leading-tight">
          Best: {longestStreak} days
        </div>
      </div>
    </div>
  )
}
