'use client'

import Link from 'next/link'
import { Users, Copy, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Squad, SquadSeason, SquadStreak } from '@/types'

interface SquadCardProps {
  squad: Squad
  memberCount: number
  activeSeason: SquadSeason | null
  streak: SquadStreak | null
}

export default function SquadCard({ squad, memberCount, activeSeason, streak }: SquadCardProps) {
  const hasActiveSeason = activeSeason !== null && activeSeason.status === 'active'

  return (
    <Link href={`/squads/${squad.id}`}>
      <Card
        className={clsx(
          'p-5 hover:border-[#FF6B35]/50 transition-colors group',
          hasActiveSeason && 'relative overflow-hidden'
        )}
        glow={hasActiveSeason ? 'orange' : undefined}
      >
        {hasActiveSeason && (
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF6B35] via-[#7B2FBE] to-[#00D68F]" />
        )}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-lg truncate group-hover:text-[#FF6B35] transition-colors">
                {squad.name}
              </h3>
              {squad.is_active ? (
                <Badge variant="green">Active</Badge>
              ) : (
                <Badge variant="gray">Inactive</Badge>
              )}
            </div>
            {squad.description && (
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{squad.description}</p>
            )}
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#FF6B35] transition-colors shrink-0 mt-1" />
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users className="w-4 h-4" />
            <span>{memberCount}/{squad.max_members}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Copy className="w-4 h-4" />
            <span className="font-mono text-xs">{squad.invite_code}</span>
          </div>
          {streak && streak.current_streak > 0 && (
            <div className="flex items-center gap-1 text-[#FF6B35]">
              <span>🔥</span>
              <span className="font-semibold">{streak.current_streak}</span>
            </div>
          )}
        </div>

        {hasActiveSeason && (
          <div className="mt-3 text-xs text-[#00D68F] font-semibold">
            Season {activeSeason.season_number} active
          </div>
        )}
      </Card>
    </Link>
  )
}
