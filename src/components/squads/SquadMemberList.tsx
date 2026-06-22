'use client'

import { Check } from 'lucide-react'
import clsx from 'clsx'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { SquadMember } from '@/types'

interface SquadMemberListProps {
  members: SquadMember[]
  todayCompletions: Set<string>
  currentUserId: string
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

function getInitial(member: SquadMember) {
  if (member.full_name) return member.full_name[0].toUpperCase()
  if (member.username) return member.username[0].toUpperCase()
  return '?'
}

export default function SquadMemberList({ members, todayCompletions, currentUserId }: SquadMemberListProps) {
  if (members.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Users className="w-8 h-8 text-gray-500 mx-auto mb-2" />
        <p className="text-gray-400 text-sm">No members yet</p>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {members.map(member => {
        const isCurrentUser = member.user_id === currentUserId
        const isAdmin = member.role === 'admin'
        const completed = todayCompletions.has(member.user_id)

        return (
          <Card key={member.id} className="p-3 flex items-center gap-3">
            <div
              className={clsx(
                'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shrink-0',
                getAvatarGradient(member.user_id)
              )}
            >
              {getInitial(member)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white text-sm truncate">
                  {member.full_name || member.username || 'Unknown'}
                </span>
                {isCurrentUser && (
                  <span className="text-xs text-gray-500">You</span>
                )}
                {isAdmin && (
                  <Badge variant="purple">Admin</Badge>
                )}
              </div>
            </div>
            {completed && (
              <div className="w-7 h-7 rounded-full bg-[#00D68F]/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#00D68F]" />
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

function Users(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
