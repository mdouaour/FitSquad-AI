import { NextRequest, NextResponse } from 'next/server'

const DEMO_PROGRAMS = [
  { id: 'prog-1', title: 'Beginner Strength', description: 'A 4-week foundational strength program for beginners', difficulty: 'beginner', duration_weeks: 4, phases: 2, days_per_week: 3, source: 'library', created_by: null, is_public: true, created_at: '2026-04-01T00:00:00Z' },
  { id: 'prog-2', title: 'Warrior Conditioning', description: 'HIIT-based conditioning for intermediate athletes', difficulty: 'intermediate', duration_weeks: 6, phases: 3, days_per_week: 5, source: 'library', created_by: null, is_public: true, created_at: '2026-04-01T00:00:00Z' },
  { id: 'prog-3', title: 'Elite Performance', description: 'Advanced program combining strength, plyometrics, and endurance', difficulty: 'advanced', duration_weeks: 8, phases: 4, days_per_week: 5, source: 'library', created_by: null, is_public: true, created_at: '2026-04-01T00:00:00Z' },
]

export async function GET() {
  return NextResponse.json(DEMO_PROGRAMS)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProgram = {
      id: `prog-${Date.now()}`,
      ...body,
      source: 'custom',
      created_by: 'user-1',
      is_public: false,
      created_at: new Date().toISOString(),
    }
    return NextResponse.json(newProgram, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
