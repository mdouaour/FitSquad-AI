'use client'

import clsx from 'clsx'
import Badge from '@/components/ui/Badge'
import type { SquadSeason } from '@/types'

interface SeasonHeaderProps {
  season: SquadSeason
  weekNumber: number
  dayNumber: number
  daysPerWeek: number
}

export default function SeasonHeader({ season, weekNumber, dayNumber, daysPerWeek }: SeasonHeaderProps) {
  const progress = Math.min((dayNumber / daysPerWeek) * 100, 100)

  return (
    <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl font-bold text-white">
          Squad SZN {season.season_number}
        </h1>
        <Badge variant={season.status === 'active' ? 'green' : season.status === 'completed' ? 'purple' : 'gray'}>
          {season.status}
        </Badge>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Week {weekNumber} · Day {dayNumber}
      </p>
      <div className="w-full bg-[#0A0A0F] rounded-full h-2.5">
        <div
          className={clsx('h-full rounded-full transition-all duration-500', progress >= 100 ? 'bg-[#00D68F]' : 'bg-gradient-to-r from-[#FF6B35] to-[#00D68F]')}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-500 text-xs mt-1.5">{dayNumber}/{daysPerWeek} days completed this week</p>
    </div>
  )
}
