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

export interface Squad {
  id: string
  name: string
  description: string | null
  avatar_url: string | null
  invite_code: string
  max_members: number
  created_by: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SquadMember {
  id: string
  squad_id: string
  user_id: string
  role: 'admin' | 'member'
  joined_at: string
  username?: string
  full_name?: string
  avatar_url?: string
}

export interface Program {
  id: string
  title: string
  description: string | null
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration_weeks: number
  phases: number
  days_per_week: number
  source: 'library' | 'custom' | 'ai'
  created_by: string | null
  is_public: boolean
  created_at: string
}

export interface ProgramDay {
  id: string
  program_id: string
  day_number: number
  phase_number: number
  week_in_phase: number
  is_deload: boolean
  title: string | null
  description: string | null
  estimated_minutes: number | null
  exercises: Exercise[]
}

export interface Exercise {
  name: string
  sets: number
  reps: string
  rest_seconds: number
}

export interface SquadSeason {
  id: string
  squad_id: string
  program_id: string | null
  season_number: number
  start_date: string
  end_date: string
  status: 'upcoming' | 'active' | 'completed' | 'cancelled'
  created_at: string
}

export interface DailyLog {
  id: string
  user_id: string
  squad_id: string
  squad_season_id: string
  program_day_id: string | null
  log_date: string
  completed: boolean
  completed_at: string | null
  exercises_completed: ExerciseCompletion[]
  notes: string | null
  duration_minutes: number | null
  xp_earned: number
}

export interface ExerciseCompletion {
  exercise_name: string
  sets_done: number
  reps_done: number[]
}

export interface WorkoutReaction {
  id: string
  daily_log_id: string
  user_id: string
  reaction: 'fire' | 'muscle' | 'clap' | 'heart' | 'trophy'
  created_at: string
}

export interface Evaluation {
  id: string
  evaluator_id: string
  target_id: string
  squad_season_id: string
  week_number: number
  consistency_score: number
  effort_score: number
  comment: string | null
  created_at: string
}

export interface EvaluationPoints {
  user_id: string
  squad_season_id: string
  balance: number
  last_updated: string
}

export interface SquadStreak {
  id: string
  squad_id: string
  current_streak: number
  longest_streak: number
  last_completed_date: string | null
}

export interface SquadFeedItem {
  user_id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  completed: boolean
  completed_at: string | null
  duration_minutes: number | null
  reactions: { reaction: string; count: number; user_reacted: boolean }[]
}

export interface ProgramWithDays extends Program {
  days?: ProgramDay[]
}
