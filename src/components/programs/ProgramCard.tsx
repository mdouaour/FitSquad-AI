'use client'

import clsx from 'clsx'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import type { Program } from '@/types'

interface ProgramCardProps {
  program: Program
  onSelect: (programId: string) => void
}

const difficultyColors: Record<string, string> = {
  beginner: 'text-[#00D68F] bg-[#00D68F]/20',
  intermediate: 'text-orange-400 bg-orange-400/20',
  advanced: 'text-[#EF4444] bg-[#EF4444]/20',
}

const sourceLabels: Record<string, string> = {
  library: 'Library',
  custom: 'Custom',
  ai: 'AI Generated',
}

export default function ProgramCard({ program, onSelect }: ProgramCardProps) {
  return (
    <button
      onClick={() => onSelect(program.id)}
      className="w-full text-left transition-all duration-200 hover:scale-[1.02]"
    >
      <Card className="p-6 cursor-pointer hover:border-[#FF6B35]/40">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-white">{program.title}</h3>
          <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-semibold', difficultyColors[program.difficulty])}>
            {program.difficulty}
          </span>
        </div>
        {program.description && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{program.description}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span>{program.duration_weeks} weeks</span>
          <span>{program.days_per_week} days/week</span>
        </div>
        <Badge variant={program.source === 'library' ? 'purple' : program.source === 'custom' ? 'orange' : 'gray'}>
          {sourceLabels[program.source]}
        </Badge>
      </Card>
    </button>
  )
}
