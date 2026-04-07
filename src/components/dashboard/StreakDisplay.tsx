interface StreakDisplayProps {
  streakDays: number
}

export default function StreakDisplay({ streakDays }: StreakDisplayProps) {
  return (
    <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-4 flex items-center gap-4">
      <div className="text-4xl animate-pulse-fire">🔥</div>
      <div>
        <div className="text-3xl font-bold text-white">{streakDays}</div>
        <div className="text-sm text-gray-400">Day Streak</div>
      </div>
      {streakDays >= 7 && (
        <div className="ml-auto">
          <span className="bg-[#FF6B35]/20 text-[#FF6B35] text-xs font-bold px-2 py-1 rounded-lg">
            🏆 WEEK+
          </span>
        </div>
      )}
    </div>
  )
}
