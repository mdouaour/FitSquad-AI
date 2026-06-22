'use client'

import Link from 'next/link'
import { Users, UserPlus, Plus } from 'lucide-react'
import SquadCard from '@/components/squads/SquadCard'
import Button from '@/components/ui/Button'
import type { Squad, SquadSeason, SquadStreak } from '@/types'

const DEMO_SQUADS: {
  squad: Squad
  memberCount: number
  activeSeason: SquadSeason | null
  streak: SquadStreak | null
}[] = [
  {
    squad: { id: 'squad-1', name: 'Desert Warriors', description: 'Calisthenics crew - no excuses', avatar_url: null, invite_code: 'FIT-A3X9', max_members: 6, created_by: 'user-1', is_active: true, created_at: '2026-05-01T00:00:00Z', updated_at: '2026-06-22T00:00:00Z' },
    memberCount: 5,
    activeSeason: { id: 'season-1', squad_id: 'squad-1', program_id: 'prog-1', season_number: 1, start_date: '2026-06-01', end_date: '2026-08-23', status: 'active', created_at: '2026-06-01T00:00:00Z' },
    streak: { id: 'streak-1', squad_id: 'squad-1', current_streak: 5, longest_streak: 12, last_completed_date: '2026-06-21' }
  },
  {
    squad: { id: 'squad-2', name: 'Morning Movers', description: 'Early bird runners', avatar_url: null, invite_code: 'FIT-B7K2', max_members: 4, created_by: 'user-2', is_active: true, created_at: '2026-05-15T00:00:00Z', updated_at: '2026-06-20T00:00:00Z' },
    memberCount: 4,
    activeSeason: null,
    streak: null
  }
]

export default function SquadsPage() {
  const squads = DEMO_SQUADS

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B35]/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-[#FF6B35]" />
          </div>
          <h1 className="text-2xl font-bold text-white">My Squads</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/squads/create">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Create Squad
            </Button>
          </Link>
          <Link href="/squads/join">
            <Button variant="secondary" size="sm">
              <UserPlus className="w-4 h-4 mr-1" />
              Join Squad
            </Button>
          </Link>
        </div>
      </div>

      {squads.length === 0 ? (
        <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1E1E2E] flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-500" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">You&apos;re not in any squad yet</h2>
          <p className="text-gray-400 mb-6 max-w-sm mx-auto">
            Create a squad and invite your friends, or join one with an invite code.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/squads/create">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-1" />
                Create Squad
              </Button>
            </Link>
            <Link href="/squads/join">
              <Button variant="secondary">
                <UserPlus className="w-4 h-4 mr-1" />
                Join Squad
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {squads.map((item) => (
            <SquadCard
              key={item.squad.id}
              squad={item.squad}
              memberCount={item.memberCount}
              activeSeason={item.activeSeason}
              streak={item.streak}
            />
          ))}
        </div>
      )}
    </div>
  )
}
