import { xpProgressPercent, xpForNextLevel, getLevelTitle } from '@/lib/xp'

interface XPProgressProps {
  xp: number
  level: number
}

export default function XPProgress({ xp, level }: XPProgressProps) {
  const progress = xpProgressPercent(xp)
  const nextLevelXP = xpForNextLevel(xp)
  const title = getLevelTitle(level)

  return (
    <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">{xp.toLocaleString()}</span>
            <span className="text-gray-400 text-sm">XP</span>
          </div>
          <div className="text-xs text-gray-500 mt-0.5">{title} · Level {level}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">{nextLevelXP - xp} XP to</div>
          <div className="text-sm font-semibold text-[#FF6B35]">Level {level + 1}</div>
        </div>
      </div>
      <div className="w-full bg-[#1E1E2E] rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#FF6B35] to-[#7B2FBE] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1 text-right">{progress}%</div>
    </div>
  )
}
