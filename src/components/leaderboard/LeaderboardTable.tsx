'use client'

import { Trophy, Flame, Zap } from 'lucide-react'
import type { LeaderboardEntry } from '@/types'

const DEMO_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', username: 'beast_mode', full_name: 'Alex Chen', avatar_url: null, xp: 2400, level: 25, streak_days: 45, last_active: new Date().toISOString(), total_workouts: 120, rank: 1 },
  { id: '2', username: 'iron_will_sara', full_name: 'Sara Ahmed', avatar_url: null, xp: 1850, level: 19, streak_days: 30, last_active: new Date().toISOString(), total_workouts: 95, rank: 2 },
  { id: '3', username: 'warrior_42', full_name: 'Mohamed Al-Rashid', avatar_url: null, xp: 750, level: 8, streak_days: 12, last_active: new Date().toISOString(), total_workouts: 38, rank: 3 },
  { id: '4', username: 'daily_runner', full_name: 'Priya Patel', avatar_url: null, xp: 600, level: 7, streak_days: 5, last_active: new Date(Date.now() - 86400000).toISOString(), total_workouts: 30, rank: 4 },
  { id: '5', username: 'zen_master', full_name: 'James Liu', avatar_url: null, xp: 400, level: 5, streak_days: 3, last_active: new Date(Date.now() - 2 * 86400000).toISOString(), total_workouts: 20, rank: 5 },
  { id: '6', username: 'fit_ninja', full_name: 'Layla Hassan', avatar_url: null, xp: 280, level: 3, streak_days: 1, last_active: new Date(Date.now() - 3 * 86400000).toISOString(), total_workouts: 14, rank: 6 },
  { id: '7', username: 'morning_grind', full_name: 'David Kim', avatar_url: null, xp: 150, level: 2, streak_days: 0, last_active: new Date(Date.now() - 5 * 86400000).toISOString(), total_workouts: 8, rank: 7 },
]

const MY_USERNAME = 'warrior_42'

const rankMedal = (rank: number) => {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}

function isActiveToday(lastActive: string | null): boolean {
  if (!lastActive) return false
  const last = new Date(lastActive)
  const today = new Date()
  return last.toDateString() === today.toDateString()
}

export default function LeaderboardTable() {
  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex items-center gap-3">
        <Trophy className="w-7 h-7 text-[#FF6B35]" />
        <div>
          <h1 className="text-2xl font-bold text-white">Squad Leaderboard</h1>
          <p className="text-gray-400 text-sm">{DEMO_LEADERBOARD.length} athletes competing</p>
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 0, 2].map((order) => {
          const podiumEntry = DEMO_LEADERBOARD[order]
          return (
            <div
              key={podiumEntry.id}
              className={`bg-[#13131A] border rounded-2xl p-3 text-center ${
                order === 0 ? 'border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.15)]' : 'border-[#1E1E2E]'
              } ${order === 0 ? 'mt-0' : 'mt-4'}`}
            >
              <div className="text-2xl mb-1">{rankMedal(podiumEntry.rank)}</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#7B2FBE] flex items-center justify-center text-white font-bold text-sm mx-auto mb-1">
                {podiumEntry.username[0].toUpperCase()}
              </div>
              <div className="text-white font-semibold text-xs truncate">{podiumEntry.username}</div>
              <div className="text-[#FF6B35] text-xs font-bold">{podiumEntry.xp.toLocaleString()} XP</div>
            </div>
          )
        })}
      </div>

      {/* Full list */}
      <div className="space-y-2">
        {DEMO_LEADERBOARD.map(entry => (
          <div
            key={entry.id}
            className={`bg-[#13131A] border rounded-2xl p-4 flex items-center gap-4 transition-all ${
              entry.username === MY_USERNAME
                ? 'border-[#FF6B35]/50 shadow-[0_0_20px_rgba(255,107,53,0.1)]'
                : 'border-[#1E1E2E] hover:border-[#1E1E2E]/80'
            }`}
          >
            <div className="w-8 text-center font-bold text-sm">
              {entry.rank <= 3 ? rankMedal(entry.rank) : <span className="text-gray-500">#{entry.rank}</span>}
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#7B2FBE] flex items-center justify-center text-white font-bold flex-shrink-0">
              {entry.username[0].toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-sm truncate ${entry.username === MY_USERNAME ? 'text-[#FF6B35]' : 'text-white'}`}>
                  {entry.username}
                  {entry.username === MY_USERNAME && ' (you)'}
                </span>
                {isActiveToday(entry.last_active) && (
                  <span className="w-2 h-2 bg-[#00D68F] rounded-full flex-shrink-0" title="Active today" />
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-gray-500">Lv.{entry.level}</span>
                <span className="flex items-center gap-0.5 text-xs text-gray-500">
                  <Flame className="w-3 h-3 text-[#FF6B35]" />
                  {entry.streak_days}d
                </span>
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="flex items-center gap-1 text-[#FF6B35] font-bold text-sm">
                <Zap className="w-3.5 h-3.5" />
                {entry.xp.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">{entry.total_workouts} sessions</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
