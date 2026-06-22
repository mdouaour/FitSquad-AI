import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await params
  return NextResponse.json([])
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const xpEarned = Math.max(10, Math.floor((body.duration_minutes || 25) * 2)) * 1.5
    const log = {
      id: `log-${Date.now()}`,
      user_id: 'user-1',
      squad_id: 'squad-1',
      squad_season_id: id,
      log_date: new Date().toISOString().split('T')[0],
      completed: true,
      completed_at: new Date().toISOString(),
      xp_earned: Math.round(xpEarned),
    }
    return NextResponse.json(log, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
