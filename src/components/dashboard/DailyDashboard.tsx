'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Target, Zap, Trophy, MessageCircle } from 'lucide-react'
import XPProgress from './XPProgress'
import StreakDisplay from './StreakDisplay'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { getLevelTitle } from '@/lib/xp'

const DEMO_PROFILE = {
  username: 'warrior_42',
  full_name: 'Mohamed Al-Rashid',
  xp: 750,
  level: 8,
  streak_days: 12,
  preferred_language: 'en',
}

const DEMO_RECENT_WORKOUTS = [
  { id: '1', title: 'Morning Run', duration_minutes: 30, xp_earned: 60, completed_at: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', title: 'Squat Session', duration_minutes: 45, xp_earned: 90, completed_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: '3', title: 'HIIT Warrior', duration_minutes: 25, xp_earned: 75, completed_at: new Date(Date.now() - 3 * 86400000).toISOString() },
]

export default function DailyDashboard() {
  const [showLogModal, setShowLogModal] = useState(false)
  const [logForm, setLogForm] = useState({ title: '', duration: '' })
  const [logSuccess, setLogSuccess] = useState(false)

  const profile = DEMO_PROFILE
  const title = getLevelTitle(profile.level)

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault()
    setLogSuccess(true)
    setTimeout(() => {
      setShowLogModal(false)
      setLogSuccess(false)
      setLogForm({ title: '', duration: '' })
    }, 1500)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{getGreeting()},</p>
          <h1 className="text-2xl font-bold text-white">{profile.full_name || profile.username} 👋</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-[#FF6B35]/20 text-[#FF6B35] px-2 py-0.5 rounded-full font-semibold">
              {title} · Lv.{profile.level}
            </span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#7B2FBE] flex items-center justify-center text-xl">
          {profile.full_name?.[0] ?? profile.username[0].toUpperCase()}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <StreakDisplay streakDays={profile.streak_days} />
        <Card className="p-4 flex items-center gap-3">
          <div className="text-3xl">⚡</div>
          <div>
            <div className="text-2xl font-bold text-white">{profile.xp}</div>
            <div className="text-sm text-gray-400">Total XP</div>
          </div>
        </Card>
      </div>

      {/* XP Progress */}
      <XPProgress xp={profile.xp} level={profile.level} />

      {/* Today's Mission */}
      <Card className="p-5" glow="purple">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-[#7B2FBE]" />
          <h3 className="font-semibold text-white">Today&apos;s Mission</h3>
          <Badge variant="purple">Daily</Badge>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          Complete a 20-minute cardio session + 50 squats. Stay hydrated! 🎯
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-[#00D68F] font-semibold">+75 XP on completion</span>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowLogModal(true)}
          className="bg-[#FF6B35] hover:bg-[#FF8C5A] text-white font-semibold py-4 px-4 rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Log Workout
        </button>
        <Link
          href="/coach"
          className="bg-[#1E1E2E] hover:bg-[#2A2A3E] text-white font-semibold py-4 px-4 rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5 text-[#7B2FBE]" />
          Ask Coach
        </Link>
      </div>

      {/* Links row */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/tracks" className="card p-4 hover:border-[#FF6B35]/50 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏃</div>
            <div>
              <div className="font-semibold text-white text-sm group-hover:text-[#FF6B35] transition-colors">Tracks</div>
              <div className="text-xs text-gray-500">6 available</div>
            </div>
          </div>
        </Link>
        <Link href="/leaderboard" className="card p-4 hover:border-[#FF6B35]/50 transition-colors group">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-[#FF6B35]" />
            <div>
              <div className="font-semibold text-white text-sm group-hover:text-[#FF6B35] transition-colors">Leaderboard</div>
              <div className="text-xs text-gray-500">Rank #3</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Workouts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FF6B35]" />
            Recent Workouts
          </h3>
        </div>
        <div className="space-y-2">
          {DEMO_RECENT_WORKOUTS.map(workout => (
            <Card key={workout.id} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium text-white text-sm">{workout.title}</div>
                <div className="text-xs text-gray-500">{workout.duration_minutes} min · {new Date(workout.completed_at).toLocaleDateString()}</div>
              </div>
              <Badge variant="orange">+{workout.xp_earned} XP</Badge>
            </Card>
          ))}
        </div>
      </div>

      {/* Log Workout Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center z-50 p-4" onClick={() => setShowLogModal(false)}>
          <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">Log Workout</h3>
            {logSuccess ? (
              <div className="text-center py-6">
                <div className="text-5xl mb-3">🎉</div>
                <p className="text-[#00D68F] font-semibold">Workout logged! +XP earned!</p>
              </div>
            ) : (
              <form onSubmit={handleLogWorkout} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Workout Title</label>
                  <input
                    type="text"
                    required
                    value={logForm.title}
                    onChange={e => setLogForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Morning Run"
                    className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={logForm.duration}
                    onChange={e => setLogForm(f => ({ ...f, duration: e.target.value }))}
                    placeholder="30"
                    className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowLogModal(false)} className="flex-1 bg-[#1E1E2E] hover:bg-[#2A2A3E] text-white font-semibold py-3 rounded-xl transition-all">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 bg-[#FF6B35] hover:bg-[#FF8C5A] text-white font-semibold py-3 rounded-xl transition-all">
                    Log It!
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
