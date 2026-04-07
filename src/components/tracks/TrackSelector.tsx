'use client'

import { useState } from 'react'
import TrackCard from './TrackCard'
import type { Track } from '@/types'

const DEMO_TRACKS: Track[] = [
  { id: '1', name_en: "The Runner's Path", name_ar: 'مسار العداء', description_en: 'Build your running endurance from scratch', description_ar: 'بناء تحمل الجري من الصفر', difficulty: 'beginner', xp_reward: 50, icon: '🏃', required_level: 1, created_at: '' },
  { id: '2', name_en: 'Squat King', name_ar: 'ملك القرفصاء', description_en: 'Master the king of all exercises', description_ar: 'إتقان ملك جميع التمارين', difficulty: 'intermediate', xp_reward: 75, icon: '🦵', required_level: 5, created_at: '' },
  { id: '3', name_en: 'Daily 5-Min Walk', name_ar: 'المشي 5 دقائق يومياً', description_en: 'Simple daily movement habit', description_ar: 'عادة الحركة اليومية البسيطة', difficulty: 'beginner', xp_reward: 25, icon: '🚶', required_level: 1, created_at: '' },
  { id: '4', name_en: 'Core Crusher', name_ar: 'محطم العضلات الأساسية', description_en: 'Strengthen your core for life', description_ar: 'تقوية عضلاتك الأساسية للحياة', difficulty: 'intermediate', xp_reward: 75, icon: '💪', required_level: 5, created_at: '' },
  { id: '5', name_en: 'Zen Stretch', name_ar: 'التمدد الهادئ', description_en: 'Daily flexibility and recovery', description_ar: 'المرونة اليومية والتعافي', difficulty: 'beginner', xp_reward: 30, icon: '🧘', required_level: 1, created_at: '' },
  { id: '6', name_en: 'HIIT Warrior', name_ar: 'محارب تدريب الفترات', description_en: 'High intensity interval training', description_ar: 'تدريب فترات عالي الكثافة', difficulty: 'advanced', xp_reward: 100, icon: '⚡', required_level: 10, created_at: '' },
]

const USER_LEVEL = 8

export default function TrackSelector() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')

  const filtered = filter === 'all' ? DEMO_TRACKS : DEMO_TRACKS.filter(t => t.difficulty === filter)

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Training Tracks</h1>
        <p className="text-gray-400 text-sm mt-1">Choose your path to greatness</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              filter === f
                ? 'bg-[#FF6B35] text-white'
                : 'bg-[#1E1E2E] text-gray-400 hover:text-white'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(track => (
          <TrackCard
            key={track.id}
            track={track}
            userLevel={USER_LEVEL}
            onStart={setSelectedTrack}
          />
        ))}
      </div>

      {/* Started modal */}
      {selectedTrack && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTrack(null)}>
          <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-6 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <div className="text-6xl mb-3">{selectedTrack.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{selectedTrack.name_en}</h3>
            <p className="text-gray-400 text-sm mb-4">{selectedTrack.description_en}</p>
            <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl p-3 mb-4">
              <p className="text-[#FF6B35] font-semibold">+{selectedTrack.xp_reward} XP on completion</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelectedTrack(null)} className="flex-1 bg-[#1E1E2E] text-white font-semibold py-3 rounded-xl hover:bg-[#2A2A3E] transition-all">
                Cancel
              </button>
              <button onClick={() => setSelectedTrack(null)} className="flex-1 bg-[#FF6B35] text-white font-semibold py-3 rounded-xl hover:bg-[#FF8C5A] transition-all">
                Let&apos;s Go! 🔥
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
