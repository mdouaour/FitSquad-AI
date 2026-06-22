'use client'

import clsx from 'clsx'

const emojiMap: Record<string, string> = {
  fire: '🔥',
  muscle: '💪',
  clap: '👏',
  heart: '❤️',
  trophy: '🏆',
}

interface ReactionButtonProps {
  type: 'fire' | 'muscle' | 'clap' | 'heart' | 'trophy'
  count: number
  active: boolean
  onClick: () => void
}

export default function ReactionButton({ type, count, active, onClick }: ReactionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-200',
        active
          ? 'bg-[#FF6B35]/20 text-[#FF6B35]'
          : 'bg-[#1E1E2E] text-gray-400 hover:bg-[#2A2A3E] hover:text-white'
      )}
    >
      <span className="text-base">{emojiMap[type]}</span>
      <span className="font-semibold">{count}</span>
    </button>
  )
}
