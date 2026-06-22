'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import SeasonFinale from '@/components/season/SeasonFinale'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import type { SquadSeason } from '@/types'

const DEMO_SEASON: SquadSeason = {
  id: 'season-1',
  squad_id: 'squad-1',
  program_id: 'prog-1',
  season_number: 1,
  start_date: '2026-06-01',
  end_date: '2026-08-23',
  status: 'active',
  created_at: '2026-06-01T00:00:00Z',
}

const DEMO_FINALE_STATS = {
  squadStreak: 12,
  attendance: 87,
  totalVolume: 45200,
  perfectWeeks: 8,
}

const DEMO_MVPS = {
  mostConsistent: 'Ahmed',
  mostImproved: 'Sara',
  squadSpirit: 'Karim',
}

const statusBadge: Record<string, 'green' | 'purple' | 'gray'> = {
  active: 'green',
  completed: 'purple',
  upcoming: 'gray',
  cancelled: 'gray',
}

export default function SeasonOverviewPage() {
  const params = useParams()
  const squadId = params.squadId as string
  const seasonId = params.seasonId as string

  const season = DEMO_SEASON
  const isCompleted = season.status === 'completed'

  return (
    <div className="space-y-6">
      <Link
        href={`/squads/${squadId}`}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Squad
      </Link>

      {isCompleted ? (
        <SeasonFinale
          season={season}
          squadName="Desert Warriors"
          stats={DEMO_FINALE_STATS}
          mvps={DEMO_MVPS}
        />
      ) : (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Season {season.season_number}
                </h1>
                <p className="text-gray-400 text-sm mt-1">Desert Warriors</p>
              </div>
              <Badge variant={statusBadge[season.status]}>
                {season.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[#0A0A0F] rounded-xl px-4 py-3">
                <span className="text-gray-500">Start</span>
                <p className="text-white font-semibold mt-0.5">{season.start_date}</p>
              </div>
              <div className="bg-[#0A0A0F] rounded-xl px-4 py-3">
                <span className="text-gray-500">End</span>
                <p className="text-white font-semibold mt-0.5">{season.end_date}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-white mb-2">
              Current Season Stats
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Week 3 of 12 · Season is in progress
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0A0F] rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-gray-500 text-xs">Day Streak</p>
              </div>
              <div className="bg-[#0A0A0F] rounded-xl px-4 py-3 text-center">
                <p className="text-2xl font-bold text-white">60%</p>
                <p className="text-gray-500 text-xs">Attendance</p>
              </div>
            </div>

            <div className="mt-6">
              <Link href={`/squads/${squadId}/season/${seasonId}/evaluate`}>
                <Button variant="primary" size="lg" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Weekly Evaluation
                </Button>
              </Link>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
