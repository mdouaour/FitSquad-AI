import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ seasonId: string }> }
) {
  const { seasonId } = await params
  return NextResponse.json({
    user_id: 'user-1',
    squad_season_id: seasonId,
    balance: 42,
    last_updated: '2026-06-22T00:00:00Z',
  })
}
