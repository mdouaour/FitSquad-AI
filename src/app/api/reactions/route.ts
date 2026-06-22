import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const reaction = {
      id: `reaction-${Date.now()}`,
      daily_log_id: body.daily_log_id,
      user_id: 'user-1',
      reaction: body.reaction || 'fire',
      created_at: new Date().toISOString(),
    }
    return NextResponse.json(reaction, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const logId = searchParams.get('daily_log_id')
  const reactionType = searchParams.get('reaction')

  if (!logId || !reactionType) {
    return NextResponse.json({ error: 'daily_log_id and reaction query params required' }, { status: 400 })
  }

  return NextResponse.json({ success: true, daily_log_id: logId, reaction: reactionType })
}
