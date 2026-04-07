import { Lock } from 'lucide-react'
import clsx from 'clsx'
import type { Track } from '@/types'

interface TrackCardProps {
  track: Track
  userLevel: number
  onStart: (track: Track) => void
}

const difficultyColor = {
  beginner: 'text-[#00D68F] bg-[#00D68F]/10',
  intermediate: 'text-[#FF6B35] bg-[#FF6B35]/10',
  advanced: 'text-[#7B2FBE] bg-[#7B2FBE]/10',
}

const difficultyLabel = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default function TrackCard({ track, userLevel, onStart }: TrackCardProps) {
  const isLocked = userLevel < track.required_level

  return (
    <div
      className={clsx(
        'bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-5 transition-all duration-200',
        isLocked
          ? 'opacity-60'
          : 'hover:border-[#FF6B35]/50 cursor-pointer hover:shadow-[0_0_20px_rgba(255,107,53,0.1)]'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-4xl">{track.icon}</div>
        {isLocked && (
          <div className="flex items-center gap-1 bg-[#1E1E2E] rounded-lg px-2 py-1">
            <Lock className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">Lv.{track.required_level}</span>
          </div>
        )}
      </div>

      <h3 className="font-bold text-white text-lg mb-1">{track.name_en}</h3>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{track.description_en}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={clsx('text-xs font-semibold px-2 py-0.5 rounded-full', difficultyColor[track.difficulty])}>
            {difficultyLabel[track.difficulty]}
          </span>
          <span className="text-xs text-[#FF6B35] font-semibold">+{track.xp_reward} XP</span>
        </div>

        {!isLocked && (
          <button
            onClick={() => onStart(track)}
            className="bg-[#FF6B35] hover:bg-[#FF8C5A] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-95"
          >
            Start
          </button>
        )}
        {isLocked && (
          <span className="text-xs text-gray-500">Unlock at Lv.{track.required_level}</span>
        )}
      </div>
    </div>
  )
}
