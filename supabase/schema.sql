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
