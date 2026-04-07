export const XP_PER_LEVEL = 100

export function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function xpForNextLevel(xp: number): number {
  const currentLevel = calculateLevel(xp)
  return currentLevel * XP_PER_LEVEL
}

export function xpProgressPercent(xp: number): number {
  const currentLevelXP = (calculateLevel(xp) - 1) * XP_PER_LEVEL
  const nextLevelXP = calculateLevel(xp) * XP_PER_LEVEL
  return Math.round(((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100)
}

export function xpForWorkout(
  durationMinutes: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  hasStreak: boolean
): number {
  const baseXP = Math.max(10, Math.floor(durationMinutes * 2))
  const difficultyMultiplier = { beginner: 1, intermediate: 1.5, advanced: 2 }[difficulty]
  const streakBonus = hasStreak ? 1.1 : 1
  return Math.round(baseXP * difficultyMultiplier * streakBonus)
}

export function getLevelTitle(level: number): string {
  if (level < 5) return 'Rookie'
  if (level < 10) return 'Athlete'
  if (level < 20) return 'Champion'
  if (level < 30) return 'Legend'
  return 'Elite'
}

export function getLevelTitleAr(level: number): string {
  if (level < 5) return 'مبتدئ'
  if (level < 10) return 'رياضي'
  if (level < 20) return 'بطل'
  if (level < 30) return 'أسطورة'
  return 'نخبة'
}
