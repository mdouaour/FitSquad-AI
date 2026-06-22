import { NextRequest, NextResponse } from 'next/server'

const DEMO_SQUADS = [
  { id: 'squad-1', name: 'Desert Warriors', description: 'Calisthenics crew - no excuses', avatar_url: null, invite_code: 'FIT-A3X9', max_members: 6, created_by: 'user-1', is_active: true, created_at: '2026-05-01T00:00:00Z', updated_at: '2026-06-22T00:00:00Z' },
  { id: 'squad-2', name: 'Morning Movers', description: 'Early bird runners', avatar_url: null, invite_code: 'FIT-B7K2', max_members: 4, created_by: 'user-2', is_active: true, created_at: '2026-05-15T00:00:00Z', updated_at: '2026-06-20T00:00:00Z' },
]

export async function GET() {
  return NextResponse.json(DEMO_SQUADS)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newSquad = {
      id: `squad-${Date.now()}`,
      ...body,
      invite_code: `FIT-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      created_by: 'user-1',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    return NextResponse.json(newSquad, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
