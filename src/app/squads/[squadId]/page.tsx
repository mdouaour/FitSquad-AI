'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import SeasonHeader from '@/components/season/SeasonHeader'
import DayWorkout from '@/components/programs/DayWorkout'
import SquadAttendanceBar from '@/components/season/SquadAttendanceBar'
import SquadFeed from '@/components/squads/SquadFeed'
import SquadStreakBadge from '@/components/squads/SquadStreakBadge'
import Card from '@/components/ui/Card'
import type { ProgramDay, SquadFeedItem, Exercise, ExerciseCompletion, SquadMember } from '@/types'

const DEMO_MEMBERS: (SquadMember & { username: string; full_name: string })[] = [
  { id: 'user-1', squad_id: 'squad-1', user_id: 'user-1', role: 'admin' as const, joined_at: '2026-05-01T00:00:00Z', username: 'warrior_42', full_name: 'Ahmed' },
  { id: 'user-2', squad_id: 'squad-1', user_id: 'user-2', role: 'member' as const, joined_at: '2026-05-01T00:00:00Z', username: 'sara_fit', full_name: 'Sara' },
  { id: 'user-3', squad_id: 'squad-1', user_id: 'user-3', role: 'member' as const, joined_at: '2026-05-02T00:00:00Z', username: 'karim_kb', full_name: 'Karim' },
  { id: 'user-4', squad_id: 'squad-1', user_id: 'user-4', role: 'member' as const, joined_at: '2026-05-03T00:00:00Z', username: 'lina_run', full_name: 'Lina' },
  { id: 'user-5', squad_id: 'squad-1', user_id: 'user-5', role: 'member' as const, joined_at: '2026-05-04T00:00:00Z', username: 'omar_fit', full_name: 'Omar' },
]

const DEMO_EXERCISES: Exercise[] = [
  { name: 'Pull-ups', sets: 3, reps: '8', rest_seconds: 90 },
  { name: 'Push-ups', sets: 3, reps: '15', rest_seconds: 60 },
  { name: 'Squats', sets: 3, reps: '20', rest_seconds: 60 },
]

function buildDemoDay(): ProgramDay {
  return {
    id: 'day-1',
    program_id: 'prog-1',
    day_number: 3,
    phase_number: 1,
    week_in_phase: 1,
    is_deload: false,
    title: 'Upper Body Focus',
    description: 'Complete all sets with proper form. Rest as needed between exercises.',
    estimated_minutes: 25,
    exercises: DEMO_EXERCISES,
  }
}

function buildInitialFeed(): SquadFeedItem[] {
  return DEMO_MEMBERS.map((m) => ({
    user_id: m.user_id,
    username: m.username,
    full_name: m.full_name,
    avatar_url: null,
    completed: false,
    completed_at: null,
    duration_minutes: null,
    reactions: [
      { reaction: 'fire', count: 0, user_reacted: false },
      { reaction: 'muscle', count: 0, user_reacted: false },
      { reaction: 'clap', count: 0, user_reacted: false },
      { reaction: 'heart', count: 0, user_reacted: false },
      { reaction: 'trophy', count: 0, user_reacted: false },
    ],
  }))
}

const CURRENT_USER_ID = 'user-1'

export default function SquadHomePage() {
  const params = useParams()
  const squadId = params.squadId as string

  const [completed, setCompleted] = useState(false)
  const [completedAt, setCompletedAt] = useState<string | null>(null)
  const [feedItems, setFeedItems] = useState<SquadFeedItem[]>(buildInitialFeed)

  const demoDay = useMemo(() => buildDemoDay(), [])

  const membership = DEMO_MEMBERS.find((m) => m.user_id === CURRENT_USER_ID)
  const isMember = !!membership

  const completedCount = feedItems.filter((f) => f.completed).length
  const totalCount = feedItems.length

  function handleWorkoutComplete(_exercises: ExerciseCompletion[]) {
    const now = new Date().toISOString()
    setCompleted(true)
    setCompletedAt(now)

    setFeedItems((prev) =>
      prev.map((item) =>
        item.user_id === CURRENT_USER_ID
          ? { ...item, completed: true, completed_at: now, duration_minutes: 25 }
          : item
      )
    )
  }

  function handleReact(logId: string, reaction: string) {
    setFeedItems((prev) =>
      prev.map((item) => {
        const key = `${item.user_id}-${prev.indexOf(item)}`
        if (key !== logId) return item
        return {
          ...item,
          reactions: item.reactions.map((r) =>
            r.reaction === reaction
              ? {
                  ...r,
                  count: r.user_reacted ? r.count - 1 : r.count + 1,
                  user_reacted: !r.user_reacted,
                }
              : r
          ),
        }
      })
    )
  }

  if (!isMember) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-gray-400 mb-4">You are not a member of this squad.</p>
          <Link href="/squads">
            <button className="text-[#FF6B35] hover:text-[#FF8C5A] transition-colors font-semibold">
              Back to My Squads
            </button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link
        href="/squads"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Squads
      </Link>

      <SeasonHeader
        season={{ id: 'season-1', squad_id: squadId, program_id: 'prog-1', season_number: 1, start_date: '2026-06-01', end_date: '2026-08-23', status: 'active', created_at: '2026-06-01T00:00:00Z' }}
        weekNumber={3}
        dayNumber={3}
        daysPerWeek={4}
      />

      {!completed ? (
        <DayWorkout day={demoDay} onComplete={handleWorkoutComplete} />
      ) : (
        <Card className="p-6 text-center" glow="green">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-lg font-bold text-white mb-1">Workout Complete!</h3>
          <p className="text-gray-400 text-sm">Great work today! You earned 120 XP.</p>
        </Card>
      )}

      <SquadAttendanceBar
        total={totalCount}
        completed={completedCount}
        members={feedItems.map((f) => ({
          userId: f.user_id,
          username: f.username,
          avatar_url: f.avatar_url,
          completed: f.completed,
        }))}
      />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Squad Feed</h2>
          <Link
            href={`/squads/${squadId}/season/season-1`}
            className="text-sm text-[#FF6B35] hover:text-[#FF8C5A] transition-colors inline-flex items-center gap-1"
          >
            <Calendar className="w-4 h-4" />
            Season Overview
          </Link>
        </div>
        <SquadFeed items={feedItems} currentUserId={CURRENT_USER_ID} onReact={handleReact} />
      </div>

      <div className="flex justify-center pt-2">
        <SquadStreakBadge currentStreak={5} longestStreak={12} />
      </div>
    </div>
  )
}
