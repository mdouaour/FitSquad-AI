'use client'

import { Clock } from 'lucide-react'
import clsx from 'clsx'
import Card from '@/components/ui/Card'
import type { SquadFeedItem } from '@/types'

interface SquadFeedProps {
  items: SquadFeedItem[]
  currentUserId: string
  onReact: (logId: string, reaction: string) => void
}

const REACTIONS = [
  { key: 'fire', emoji: '🔥' },
  { key: 'muscle', emoji: '💪' },
  { key: 'clap', emoji: '👏' },
  { key: 'heart', emoji: '❤️' },
  { key: 'trophy', emoji: '🏆' },
]

function getTimeAgo(dateStr: string | null): string {
  if (!dateStr) return ''
  const now = Date.now()
  const diff = now - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const AVATAR_GRADIENTS = [
  'from-[#FF6B35] to-[#FF8C5A]',
  'from-[#7B2FBE] to-[#9B4FDE]',
  'from-[#00D68F] to-[#00E8A0]',
  'from-[#FF6B35] to-[#7B2FBE]',
  'from-[#4A90D9] to-[#6AB0F9]',
]

function getAvatarGradient(userId: string) {
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i)
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length]
}

function getInitial(item: SquadFeedItem) {
  if (item.full_name) return item.full_name[0].toUpperCase()
  return item.username?.[0]?.toUpperCase() || '?'
}

export default function SquadFeed({ items, currentUserId, onReact }: SquadFeedProps) {
  if (items.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-4xl mb-3">💪</div>
        <p className="text-gray-400 font-medium">
          No one has worked out yet today. Be the first! 💪
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isCurrentUser = item.user_id === currentUserId

        return (
          <Card key={`${item.user_id}-${idx}`} className="p-4">
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shrink-0',
                  getAvatarGradient(item.user_id)
                )}
              >
                {getInitial(item)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white text-sm truncate">
                    {item.full_name || item.username}
                  </span>
                  {isCurrentUser && (
                    <span className="text-xs text-gray-500">You</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {item.completed ? (
                    <>
                      <span className="text-[#00D68F] text-sm font-medium">✓</span>
                      <span className="text-xs text-gray-400">
                        Completed {getTimeAgo(item.completed_at)}
                        {item.duration_minutes && ` · ${item.duration_minutes} min`}
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-xs text-gray-500">Not yet</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[#1E1E2E]">
              {REACTIONS.map(({ key, emoji }) => {
                const reaction = item.reactions?.find(r => r.reaction === key)
                const count = reaction?.count ?? 0
                const userReacted = reaction?.user_reacted ?? false

                return (
                  <button
                    key={key}
                    onClick={() => onReact(`${item.user_id}-${idx}`, key)}
                    className={clsx(
                      'flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm transition-all duration-200',
                      userReacted
                        ? 'bg-[#FF6B35]/20 text-[#FF6B35]'
                        : 'text-gray-500 hover:bg-[#1E1E2E] hover:text-gray-300'
                    )}
                  >
                    <span>{emoji}</span>
                    {count > 0 && <span className="text-xs font-medium">{count}</span>}
                  </button>
                )
              })}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
