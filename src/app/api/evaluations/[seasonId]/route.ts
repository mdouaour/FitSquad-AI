import { NextRequest, NextResponse } from 'next/server'

const DEMO_EVALUATIONS: Record<string, unknown> = {
  'season-1': [
    { id: 'eval-1', evaluator_id: 'user-3', target_id: 'user-1', squad_season_id: 'season-1', week_number: 1, consistency_score: 4, effort_score: 5, comment: 'Great energy this week!', created_at: '2026-06-01T00:00:00Z' },
    { id: 'eval-2', evaluator_id: 'user-4', target_id: 'user-1', squad_season_id: 'season-1', week_number: 1, consistency_score: 5, effort_score: 5, comment: 'Beast mode!', created_at: '2026-06-01T00:00:00Z' },
  ],
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ seasonId: string }> }
) {
  const { seasonId } = await params
  const evaluations = (DEMO_EVALUATIONS[seasonId] as Array<unknown>) || []
  return NextResponse.json(evaluations)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ seasonId: string }> }
) {
  const { seasonId } = await params
  try {
    const body = await request.json()
    const newEval = {
      id: `eval-${Date.now()}`,
      evaluator_id: 'user-1',
      target_id: body.target_id || 'user-3',
      squad_season_id: seasonId,
      week_number: body.week_number || 1,
      consistency_score: body.consistency_score || 3,
      effort_score: body.effort_score || 3,
      comment: body.comment || '',
      created_at: new Date().toISOString(),
    }
    return NextResponse.json(newEval, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
