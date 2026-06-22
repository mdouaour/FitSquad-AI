-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_active DATE,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'ar')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracks table
CREATE TABLE tracks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  xp_reward INTEGER DEFAULT 50,
  icon TEXT DEFAULT '🏃',
  required_level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workouts table
CREATE TABLE workouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  track_id UUID REFERENCES tracks(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER,
  xp_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leaderboard view
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
  p.id,
  p.username,
  p.full_name,
  p.avatar_url,
  p.xp,
  p.level,
  p.streak_days,
  p.last_active,
  COUNT(w.id) AS total_workouts,
  RANK() OVER (ORDER BY p.xp DESC) AS rank
FROM profiles p
LEFT JOIN workouts w ON w.user_id = p.id
GROUP BY p.id, p.username, p.full_name, p.avatar_url, p.xp, p.level, p.streak_days, p.last_active;

-- Badges table
CREATE TABLE badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  icon TEXT NOT NULL,
  xp_required INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User badges junction
CREATE TABLE user_badges (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- AI Messages table
CREATE TABLE ai_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL,
  content TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can view all profiles for leaderboard" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can manage their own workouts" ON workouts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own messages" ON ai_messages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own badges" ON user_badges FOR SELECT USING (auth.uid() = user_id);

-- Seed default tracks
INSERT INTO tracks (name_en, name_ar, description_en, description_ar, difficulty, xp_reward, icon, required_level) VALUES
('The Runner''s Path', 'مسار العداء', 'Build your running endurance from scratch', 'بناء تحمل الجري من الصفر', 'beginner', 50, '🏃', 1),
('Squat King', 'ملك القرفصاء', 'Master the king of all exercises', 'إتقان ملك جميع التمارين', 'intermediate', 75, '🦵', 5),
('Daily 5-Min Walk', 'المشي 5 دقائق يومياً', 'Simple daily movement habit', 'عادة الحركة اليومية البسيطة', 'beginner', 25, '🚶', 1),
('Core Crusher', 'محطم العضلات الأساسية', 'Strengthen your core for life', 'تقوية عضلاتك الأساسية للحياة', 'intermediate', 75, '💪', 5),
('Zen Stretch', 'التمدد الهادئ', 'Daily flexibility and recovery', 'المرونة اليومية والتعافي', 'beginner', 30, '🧘', 1),
('HIIT Warrior', 'محارب تدريب الفترات', 'High intensity interval training', 'تدريب فترات عالي الكثافة', 'advanced', 100, '⚡', 10);

-- Seed default badges
INSERT INTO badges (name_en, name_ar, description_en, description_ar, icon, xp_required) VALUES
('First Step', 'الخطوة الأولى', 'Complete your first workout', 'أكمل تمرينك الأول', '👟', 50),
('Week Warrior', 'محارب الأسبوع', 'Maintain a 7-day streak', 'حافظ على سلسلة 7 أيام', '🔥', 350),
('Century Club', 'نادي المئة', 'Reach 100 XP', 'الوصول إلى 100 نقطة خبرة', '💯', 100),
('Level 5 Legend', 'أسطورة المستوى 5', 'Reach Level 5', 'الوصول إلى المستوى 5', '⭐', 500),
('Iron Will', 'إرادة حديدية', 'Complete 30 workouts', 'أكمل 30 تمريناً', '🏆', 1500);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ==========================================
-- SQUAD ACCOUNTABILITY SYSTEM
-- ==========================================

CREATE TABLE IF NOT EXISTS squads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  invite_code TEXT UNIQUE NOT NULL,
  max_members INT DEFAULT 8 CHECK (max_members >= 4 AND max_members <= 8),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS squad_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(squad_id, user_id)
);

CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration_weeks INT DEFAULT 12,
  phases INT DEFAULT 3,
  days_per_week INT DEFAULT 4,
  source TEXT DEFAULT 'library' CHECK (source IN ('library', 'custom', 'ai')),
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS program_days (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE NOT NULL,
  day_number INT NOT NULL,
  phase_number INT NOT NULL CHECK (phase_number BETWEEN 1 AND 3),
  week_in_phase INT NOT NULL CHECK (week_in_phase BETWEEN 1 AND 4),
  is_deload BOOLEAN DEFAULT false,
  title TEXT,
  description TEXT,
  estimated_minutes INT,
  exercises JSONB NOT NULL DEFAULT '[]',
  UNIQUE(program_id, day_number)
);

CREATE TABLE IF NOT EXISTS squad_seasons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE NOT NULL,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  season_number INT DEFAULT 1,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE NOT NULL,
  squad_season_id UUID REFERENCES squad_seasons(id) ON DELETE CASCADE NOT NULL,
  program_day_id UUID REFERENCES program_days(id) ON DELETE SET NULL,
  log_date DATE NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  exercises_completed JSONB DEFAULT '[]',
  notes TEXT,
  duration_minutes INT,
  xp_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, squad_season_id, log_date)
);

CREATE TABLE IF NOT EXISTS workout_reactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  daily_log_id UUID REFERENCES daily_logs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reaction TEXT NOT NULL CHECK (reaction IN ('fire', 'muscle', 'clap', 'heart', 'trophy')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(daily_log_id, user_id)
);

CREATE TABLE IF NOT EXISTS evaluations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  evaluator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  squad_season_id UUID REFERENCES squad_seasons(id) ON DELETE CASCADE NOT NULL,
  week_number INT NOT NULL,
  consistency_score INT CHECK (consistency_score BETWEEN 1 AND 5) NOT NULL,
  effort_score INT CHECK (effort_score BETWEEN 1 AND 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(evaluator_id, target_id, squad_season_id, week_number)
);

CREATE TABLE IF NOT EXISTS evaluation_points (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  squad_season_id UUID REFERENCES squad_seasons(id) ON DELETE CASCADE NOT NULL,
  balance INT DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, squad_season_id)
);

CREATE TABLE IF NOT EXISTS squad_streaks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE NOT NULL,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_completed_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE squads ENABLE ROW LEVEL SECURITY;
ALTER TABLE squad_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE squad_seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE squad_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view squad" ON squads FOR SELECT USING (
  id IN (SELECT squad_id FROM squad_members WHERE user_id = auth.uid())
);
CREATE POLICY "Admin can update squad" ON squads FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "Anyone can view squad members" ON squad_members FOR SELECT USING (true);
CREATE POLICY "Members can view squad logs" ON daily_logs FOR SELECT USING (
  squad_id IN (SELECT squad_id FROM squad_members WHERE user_id = auth.uid())
);
CREATE POLICY "Users manage own logs" ON daily_logs FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Members can view eval scores" ON evaluations FOR SELECT USING (
  squad_season_id IN (SELECT ss.id FROM squad_seasons ss JOIN squad_members sm ON sm.squad_id = ss.squad_id WHERE sm.user_id = auth.uid())
);
CREATE POLICY "Users create own evals" ON evaluations FOR INSERT WITH CHECK (evaluator_id = auth.uid());
