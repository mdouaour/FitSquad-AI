'use client'

import clsx from 'clsx'

interface AttendanceMember {
  userId: string
  username: string
  avatar_url: string | null
  completed: boolean
}

interface SquadAttendanceBarProps {
  total: number
  completed: number
  members: AttendanceMember[]
}

export default function SquadAttendanceBar({ total, completed, members }: SquadAttendanceBarProps) {
  return (
    <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-4">
      <p className="text-sm text-gray-400 mb-3">
        <span className="text-white font-semibold">{completed}/{total}</span> members completed
      </p>
      <div className="flex flex-wrap gap-2">
        {members.map((member) => (
          <div
            key={member.userId}
            className={clsx(
              'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-200',
              member.completed
                ? 'bg-[#00D68F]/20 border-[#00D68F] text-[#00D68F]'
                : 'bg-transparent border-gray-600 text-gray-500'
            )}
            title={member.username}
          >
            {member.avatar_url ? (
              <img src={member.avatar_url} alt={member.username} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span>{member.username.charAt(0).toUpperCase()}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
