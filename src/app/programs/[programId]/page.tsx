'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import clsx from 'clsx'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const DEMO_PROGRAM = {
  id: 'prog-1',
  title: '12-Week Calisthenics Foundation',
  description: 'Build strength from the ground up with bodyweight exercises. Progressive overload every 4 weeks. No equipment needed.',
  difficulty: 'beginner' as const,
  duration_weeks: 12,
  phases: 3,
  days_per_week: 4,
}

const difficultyColors: Record<string, string> = {
  beginner: 'text-[#00D68F] bg-[#00D68F]/20',
  intermediate: 'text-orange-400 bg-orange-400/20',
  advanced: 'text-[#EF4444] bg-[#EF4444]/20',
}

export default function ProgramDetailPage() {
  const params = useParams()
  const programId = params.programId as string

  const program = DEMO_PROGRAM

  return (
    <div className="space-y-6">
      <Link
        href="/programs"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Programs
      </Link>

      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{program.title}</h1>
            <p className="text-gray-400 text-sm mt-2">{program.description}</p>
          </div>
          <span className={clsx('px-3 py-1 rounded-full text-xs font-semibold shrink-0', difficultyColors[program.difficulty])}>
            {program.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{program.duration_weeks} weeks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{program.days_per_week} days/week</span>
          </div>
          <Badge variant="purple">{program.phases} Phases</Badge>
        </div>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => alert('Starting a program is coming soon!')}
        >
          Start This Program
        </Button>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-white mb-4">12-Week Calendar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: program.duration_weeks }, (_, i) => (
            <div
              key={i}
              className="bg-[#0A0A0F] rounded-xl p-3 border border-[#1E1E2E]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold text-sm">Week {i + 1}</span>
                <span className="text-xs text-gray-500">
                  Phase {Math.min(Math.floor(i / 4) + 1, program.phases)}
                </span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: program.days_per_week }, (_, d) => (
                  <div
                    key={d}
                    className={clsx(
                      'w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-medium',
                      i < 3 ? 'bg-[#00D68F]/20 text-[#00D68F]' : 'bg-[#1E1E2E] text-gray-500'
                    )}
                  >
                    D{d + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
