export interface Profile {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  xp: number
  level: number
  streak_days: number
  last_active: string | null
  preferred_language: 'en' | 'ar'
  created_at: string
  updated_at: string
}

export interface Track {
  id: string
  name_en: string
  name_ar: string
  description_en: string | null
  description_ar: string | null
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  xp_reward: number
  icon: string
  required_level: number
  created_at: string
}

export interface Workout {
  id: string
  user_id: string
  track_id: string | null
  title: string
  description: string | null
  duration_minutes: number | null
  xp_earned: number
  completed_at: string
  created_at: string
}

export interface LeaderboardEntry {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  xp: number
  level: number
  streak_days: number
  last_active: string | null
  total_workouts: number
  rank: number
}

export interface Badge {
  id: string
  name_en: string
  name_ar: string
  description_en: string | null
  description_ar: string | null
  icon: string
  xp_required: number
}

export interface AIMessage {
  id: string
  user_id: string
  role: 'user' | 'assistant'
  content: string
  language: string
  created_at: string
}
