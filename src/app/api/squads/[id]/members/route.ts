import { NextRequest, NextResponse } from 'next/server'

const DEMO_MEMBERS: Record<string, unknown> = {
  'squad-1': [
    { id: 'member-1', squad_id: 'squad-1', user_id: 'user-1', role: 'admin', joined_at: '2026-05-01T00:00:00Z', username: 'warrior_42', full_name: 'Mohamed Al-Rashid', avatar_url: null },
    { id: 'member-2', squad_id: 'squad-1', user_id: 'user-3', role: 'member', joined_at: '2026-05-03T00:00:00Z', username: 'iron_lifter', full_name: 'Ahmed Hassan', avatar_url: null },
    { id: 'member-3', squad_id: 'squad-1', user_id: 'user-4', role: 'member', joined_at: '2026-05-05T00:00:00Z', username: 'cardio_queen', full_name: 'Layla Nasser', avatar_url: null },
  ],
  'squad-2': [
    { id: 'member-4', squad_id: 'squad-2', user_id: 'user-2', role: 'admin', joined_at: '2026-05-15T00:00:00Z', username: 'early_riser', full_name: 'Sara Khalid', avatar_url: null },
  ],
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const members = (DEMO_MEMBERS[id] as Array<unknown>) || []
  return NextResponse.json(members)
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const newMember = {
    id: `member-${Date.now()}`,
    squad_id: id,
    user_id: 'user-1',
    role: 'member',
    joined_at: new Date().toISOString(),
    username: 'warrior_42',
    full_name: 'Mohamed Al-Rashid',
    avatar_url: null,
  }
  return NextResponse.json(newMember, { status: 201 })
}
