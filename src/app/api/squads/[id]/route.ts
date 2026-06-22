import { NextRequest, NextResponse } from 'next/server'

const DEMO_SQUADS: Record<string, unknown> = {
  'squad-1': { id: 'squad-1', name: 'Desert Warriors', description: 'Calisthenics crew - no excuses', avatar_url: null, invite_code: 'FIT-A3X9', max_members: 6, created_by: 'user-1', is_active: true, created_at: '2026-05-01T00:00:00Z', updated_at: '2026-06-22T00:00:00Z' },
  'squad-2': { id: 'squad-2', name: 'Morning Movers', description: 'Early bird runners', avatar_url: null, invite_code: 'FIT-B7K2', max_members: 4, created_by: 'user-2', is_active: true, created_at: '2026-05-15T00:00:00Z', updated_at: '2026-06-20T00:00:00Z' },
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const squad = DEMO_SQUADS[id]
  if (!squad) {
    return NextResponse.json({ error: 'Squad not found' }, { status: 404 })
  }
  return NextResponse.json(squad)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const squad = DEMO_SQUADS[id]
  if (!squad) {
    return NextResponse.json({ error: 'Squad not found' }, { status: 404 })
  }
  try {
    const body = await request.json()
    const updated = { ...(squad as object), ...body, updated_at: new Date().toISOString() }
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
