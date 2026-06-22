'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen, Sparkles, Send } from 'lucide-react'
import clsx from 'clsx'
import ProgramCard from '@/components/programs/ProgramCard'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import type { Program } from '@/types'

const DEMO_PROGRAMS: Program[] = [
  { id: 'prog-1', title: '12-Week Calisthenics Foundation', description: 'Build strength from the ground up with bodyweight exercises. Progressive overload every 4 weeks.', difficulty: 'beginner', duration_weeks: 12, phases: 3, days_per_week: 4, source: 'library', created_by: null, is_public: true, created_at: '2026-01-01T00:00:00Z' },
  { id: 'prog-2', title: 'Bodyweight Blaster', description: 'Intermediate bodyweight program with increasing volume and intensity', difficulty: 'intermediate', duration_weeks: 12, phases: 3, days_per_week: 5, source: 'library', created_by: null, is_public: true, created_at: '2026-01-01T00:00:00Z' },
  { id: 'prog-3', title: 'Running Resilience', description: 'From couch to 5K in 12 weeks', difficulty: 'beginner', duration_weeks: 12, phases: 3, days_per_week: 3, source: 'library', created_by: null, is_public: true, created_at: '2026-01-01T00:00:00Z' },
]

const TABS = ['Library', 'AI Generate'] as const

export default function ProgramsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>('Library')
  const [prompt, setPrompt] = useState('')

  function handleSelect(programId: string) {
    router.push(`/programs/${programId}`)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#7B2FBE]/20 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-[#7B2FBE]" />
        </div>
        <h1 className="text-2xl font-bold text-white">Program Library</h1>
      </div>

      <div className="flex items-center gap-1 bg-[#13131A] border border-[#1E1E2E] rounded-xl p-1 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === tab
                ? 'bg-[#FF6B35] text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {tab === 'AI Generate' && <Sparkles className="w-4 h-4 inline mr-1.5" />}
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Library' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEMO_PROGRAMS.map((program) => (
            <ProgramCard key={program.id} program={program} onSelect={handleSelect} />
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B2FBE] to-[#FF6B35] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Generate Program</h2>
              <p className="text-gray-400 text-sm">Describe your ideal fitness program</p>
            </div>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A 6-week bodyweight program for beginners with 2 upper body and 2 lower body days per week..."
            rows={4}
            className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#7B2FBE] transition-colors resize-none mb-4"
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!prompt.trim()}
            onClick={() => alert('AI generation coming soon!')}
          >
            <Send className="w-4 h-4 mr-2" />
            Generate
          </Button>
        </Card>
      )}
    </div>
  )
}
