'use client'

import { Trophy, Flame, Sparkles } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { SquadSeason } from '@/types'

interface SeasonStats {
  squadStreak: number
  attendance: number
  totalVolume: number
  perfectWeeks: number
}

interface SeasonMvps {
  mostConsistent: string
  mostImproved: string
  squadSpirit: string
}

interface SeasonFinaleProps {
  season: SquadSeason
  squadName: string
  stats: SeasonStats
  mvps: SeasonMvps
}

export default function SeasonFinale({ season, squadName, stats, mvps }: SeasonFinaleProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Season {season.season_number} Complete!
        </h1>
        <p className="text-gray-400">{squadName}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 text-center" glow="green">
          <Flame className="mx-auto mb-2 text-[#FF6B35]" size={24} />
          <p className="text-2xl font-bold text-white">{stats.squadStreak}</p>
          <p className="text-gray-400 text-sm">Day Streak</p>
        </Card>
        <Card className="p-5 text-center" glow="orange">
          <Trophy className="mx-auto mb-2 text-[#FF6B35]" size={24} />
          <p className="text-2xl font-bold text-white">{stats.attendance}%</p>
          <p className="text-gray-400 text-sm">Attendance</p>
        </Card>
        <Card className="p-5 text-center" glow="purple">
          <Sparkles className="mx-auto mb-2 text-[#7B2FBE]" size={24} />
          <p className="text-2xl font-bold text-white">{stats.totalVolume.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">Total Volume</p>
        </Card>
        <Card className="p-5 text-center" glow="green">
          <Trophy className="mx-auto mb-2 text-[#00D68F]" size={24} />
          <p className="text-2xl font-bold text-white">{stats.perfectWeeks}</p>
          <p className="text-gray-400 text-sm">Perfect Weeks</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-white mb-4 text-center">Season MVPs</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-[#0A0A0F] rounded-xl px-4 py-3">
            <span className="text-gray-400 text-sm">Most Consistent</span>
            <span className="text-white font-semibold">{mvps.mostConsistent}</span>
          </div>
          <div className="flex items-center justify-between bg-[#0A0A0F] rounded-xl px-4 py-3">
            <span className="text-gray-400 text-sm">Most Improved</span>
            <span className="text-white font-semibold">{mvps.mostImproved}</span>
          </div>
          <div className="flex items-center justify-between bg-[#0A0A0F] rounded-xl px-4 py-3">
            <span className="text-gray-400 text-sm">Squad Spirit</span>
            <span className="text-white font-semibold">{mvps.squadSpirit}</span>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        <Button variant="primary" size="lg" className="w-full">
          Share Squad Story
        </Button>
        <Button variant="secondary" size="lg" className="w-full">
          Start New Season
        </Button>
        <Button variant="ghost" size="lg" className="w-full">
          Disband Squad
        </Button>
      </div>
    </div>
  )
}
