# FitSquad-AI: Squad Social Accountability System

**Date:** 2026-06-22
**Status:** Draft
**Applies to:** FitSquad-AI (Next.js 15 + Supabase)

---

## 1. Overview

Transform FitSquad-AI from an individual fitness tracker into a squad-based social fitness platform where small crews (4-8 members) follow structured 12-week progressive programs together. The core innovation is a layered accountability system combining social visibility, squad streaks, 42-style peer evaluation currency, and time-limited challenges.

### Key Metrics
- **Primary:** Squad weekly completion rate, 30-day squad retention
- **Secondary:** Daily active users, evaluation completion rate, squad streak length
- **Success target:** >70% weekly squad completion, >50% 90-day squad retention

---

## 2. UX Flow

### 2.1 Squad Formation

```
Profile → [Create Squad] or [Join Squad]
```

**Create Squad:**
1. User taps "Create Squad" on profile/settings
2. Form: Squad name, optional description, optional avatar/icon
3. System generates unique invite code (8-char alphanumeric, e.g., `FIT-A3X9`)
4. User shares invite link/code via system share sheet
5. Squad created — user is `admin` role

**Join Squad:**
1. User enters invite code or taps shared link
2. System validates: squad exists, not full (< 8 members)
3. Auto-joins as `member` role
4. Squad feed screen opens

**Squad screen (post-join):**
- Squad member cards (avatars, names, current streak, today-completed status)
- "4/6 members ready — start a program" prompt when ≥ 4 members
- Invite more button with QR/link

### 2.2 Program Selection

When squad has 4+ members, admin can initiate program selection:

1. Admin taps "Start Program"
2. Three tabs: **Library** | **Custom** | **AI Generate**

**Library:**
- Pre-built programs (12-week calisthenics, bodyweight, running, flexibility)
- Each shows: duration, phases, weekly commitment, difficulty
- Filter by difficulty (beginner/intermediate/advanced)

**Custom:**
- Admin builds program: name, phases (1-3), exercises per day, reps/sets
- Re-uses existing Track system data

**AI Generate:**
- Admin describes goals: "I want a 12-week bodyweight program for beginners, 4 days/week"
- AI generates structured program with phases, progression, deload weeks
- Admin can tweak before publishing

**Selection flow:**
- Admin picks program → preview screen with full 12-week view
- Squad members get notified to vote (approve or suggest alternatives)
- Once approved: pick start date (immediate or next Monday)
- Program locked in — all squad members see the same daily workout

### 2.3 Daily Flow

Primary user touchpoint — the squad home screen:

```
┌──────────────────────────────────────┐
│ 🔥 SQUAD SZN 1 · Week 3 · Day 17    │
│ Phase 2: Volume                      │
│                                      │
│ ═══ TODAY'S MISSION ═══              │
│ ┌────────────────────────────────┐   │
│ │ Pull-ups:  3 × 8   [ ][ ][ ]  │   │
│ │ Push-ups:  3 × 15  [ ][ ][ ]  │   │
│ │ Squats:    3 × 20  [ ][ ][ ]  │   │
│ │ Plank:     3 × 45s [ ][ ][ ]  │   │
│ └────────────────────────────────┘   │
│                                      │
│ [  Complete Workout  ]  ⏱ ~25 min   │
│                                      │
│ ─── SQUAD FEED ───                   │
│ ✅ Ahmed  · 12m ago                  │
│   🔥🔥🔥 from Sara, You, Karim       │
│ ✅ Sara   · 45m ago                  │
│   💪🔥 from Ahmed                    │
│ ⏳ You    — not yet                  │
│ ⏳ Karim  — not yet                  │
│ ⏳ Lina   — not yet                  │
│                                      │
│ Squad streak: 5 days 🔥              │
└──────────────────────────────────────┘
```

**UX Psychology applied:**
- **Loss Aversion:** Squad feed shows who completed — social cost of being the one missing
- **Social Proof:** Seeing others' completions creates momentum
- **Goal Gradient:** "You're at 4/7 this week" pushes toward week completion
- **Doherty Threshold:** One-tap "Complete" with optimistic UI
- **Fitts' Law:** Complete button is large, prominent, at bottom thumb zone

**Completion flow:**
1. User taps "Complete Workout"
2. Checkbox animation + haptic feedback
3. XP earned toast with squad multiplier
4. Push notification to squad: "🔥 Ahmed just crushed today's workout!"
5. Squad feed updates in real-time via Supabase Realtime

**Checkbox UX for each exercise:** Individual exercise checkboxes let users track sets incrementally (taps feel satisfying). The "Complete Workout" button only activates when all exercises checked.

### 2.4 Weekly Peer Evaluation

Every Sunday at 8 PM local time (configurable), evaluations open.

Flow:
1. Push notification: "Time to evaluate your squad this week"
2. Tap → evaluation screen showing each squad member

```
┌──────────────────────────────────────┐
│  WEEK 3 EVALUATIONS                  │
│  Earn 2 eval points per eval        │
│  Need 5 pts to unlock Week 4        │
│                                      │
│  ═══ Ahmed ═══                       │
│  Consistency:  ○○○○○ (showed up?)   │
│  Effort:       ○○○○○ (gave it all?) │
│  Comment (opt): [________________]  │
│                                      │
│  ═══ Sara ═══                        │
│  Consistency:  ○○○○○                 │
│  Effort:       ○○○○○                 │
│  Comment (opt): [________________]  │
│                                      │
│  [Submit All Evaluations]            │
└──────────────────────────────────────┘
```

**Evaluation rules:**
- Each squad member evaluates every other member
- 2 axes: **Consistency** (showed up?) and **Effort** (gave it all?)
- 5-star (1-5) rating per axis — tap to set
- Optional anonymous comment
- **Must evaluate all members** to submit
- Evaluations are **anonymous** — only aggregate scores visible

**Evaluation points currency:**
- Each evaluation completed = +2 evaluation points
- Each program week costs 5 evaluation points to unlock
- You MUST earn enough points by evaluating to advance
- Points persist across the season — can accumulate
- If you don't have enough points → you see a message: "You need X more eval points to unlock Week 4. Evaluate your squad members to earn them."

### 2.5 End of Program (Week 12)

Season finale celebration:

```
┌──────────────────────────────────────┐
│                                      │
│         🎉 SEASON COMPLETE 🎉        │
│                                      │
│    12 Weeks · 84 Days · 72 Workouts  │
│                                      │
│  Squad Stats:                        │
│  ┌────────────────────────────┐     │
│  │ ⭐ Squad streak: 23 days   │     │
│  │ 📊 Attendance: 87%         │     │
│  │ 🏋️ Total volume: 124,500kg │     │
│  │ 🎯 Perfect weeks: 8/12     │     │
│  └────────────────────────────┘     │
│                                      │
│  Squad MVPs:                         │
│  🏆 Most Consistent — Ahmed          │
│  🏆 Most Improved — Sara             │
│  🏆 Squad Spirit — Karim             │
│                                      │
│  [  Share Squad Story  ]             │
│  [  Start New Season   ]             │
│  [  Disband Squad      ]             │
└──────────────────────────────────────┘
```

**Peak-End Rule:** The season finale is the most memorable moment — confetti animation, shareable squad stat card, persistent squad trophy on profile.

---

## 3. Data Model

### 3.1 Schema Additions

```sql
-- ==========================================
-- SQUADS
-- ==========================================
CREATE TABLE squads (
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

CREATE TABLE squad_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(squad_id, user_id)
);

-- ==========================================
-- PROGRAMS
-- ==========================================
CREATE TABLE programs (
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

CREATE TABLE program_phases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE NOT NULL,
  phase_number INT NOT NULL CHECK (phase_number BETWEEN 1 AND 3),
  name TEXT NOT NULL, -- "Foundation", "Volume", "Intensity"
  weeks INT NOT NULL DEFAULT 4,
  description TEXT,
  UNIQUE(program_id, phase_number)
);

CREATE TABLE program_days (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  program_id UUID REFERENCES programs(id) ON DELETE CASCADE NOT NULL,
  day_number INT NOT NULL,
  phase_number INT NOT NULL CHECK (phase_number BETWEEN 1 AND 3),
  week_in_phase INT NOT NULL CHECK (week_in_phase BETWEEN 1 AND 4),
  is_deload BOOLEAN DEFAULT false,
  title TEXT,
  description TEXT,
  estimated_minutes INT,
  exercises JSONB NOT NULL,
  -- exercises format: [{ name: "Pull-ups", sets: 3, reps: "8", rest_seconds: 90 }]
  UNIQUE(program_id, day_number)
);

-- ==========================================
-- SQUAD PROGRAM SEASONS
-- ==========================================
CREATE TABLE squad_seasons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE NOT NULL,
  program_id UUID REFERENCES programs(id) ON DELETE SET NULL,
  season_number INT DEFAULT 1,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- DAILY TRACKING
-- ==========================================
CREATE TABLE daily_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE NOT NULL,
  squad_season_id UUID REFERENCES squad_seasons(id) ON DELETE CASCADE NOT NULL,
  program_day_id UUID REFERENCES program_days(id) ON DELETE SET NULL,
  log_date DATE NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  exercises_completed JSONB DEFAULT '[]',
  -- [{ exercise_name: "Pull-ups", sets_done: 3, reps_done: [8,8,7] }]
  notes TEXT,
  duration_minutes INT,
  xp_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, squad_season_id, log_date)
);

-- ==========================================
-- WORKOUT REACTIONS (Kudos)
-- ==========================================
CREATE TABLE workout_reactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  daily_log_id UUID REFERENCES daily_logs(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reaction TEXT NOT NULL CHECK (reaction IN ('fire', 'muscle', 'clap', 'heart', 'trophy')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(daily_log_id, user_id)
);

-- ==========================================
-- PEER EVALUATIONS
-- ==========================================
CREATE TABLE evaluations (
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

CREATE TABLE evaluation_points (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  squad_season_id UUID REFERENCES squad_seasons(id) ON DELETE CASCADE NOT NULL,
  balance INT DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, squad_season_id)
);

-- ==========================================
-- SQUAD STREAKS
-- ==========================================
CREATE TABLE squad_streaks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE NOT NULL,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_completed_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- View: Squad daily attendance for streak calculation
CREATE OR REPLACE VIEW squad_daily_attendance AS
SELECT
  dl.squad_id,
  dl.log_date,
  COUNT(DISTINCT dl.user_id) AS completed_count,
  COUNT(DISTINCT sm.user_id) AS total_members
FROM daily_logs dl
JOIN squad_members sm ON sm.squad_id = dl.squad_id AND sm.user_id = dl.user_id
WHERE dl.completed = true
GROUP BY dl.squad_id, dl.log_date;
```

### 3.2 Profiles Extension

```sql
ALTER TABLE profiles
ADD COLUMN squad_count INT DEFAULT 0,
ADD COLUMN total_evaluations INT DEFAULT 0,
ADD COLUMN avg_consistency_score DECIMAL(3,2),
ADD COLUMN avg_effort_score DECIMAL(3,2);
```

### 3.3 RLS Policies

```sql
-- Squads: members can read, admins can update
ALTER TABLE squads ENABLE ROW LEVEL SECURITY;
ALTER TABLE squad_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their squad" ON squads
  FOR SELECT USING (
    id IN (SELECT squad_id FROM squad_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Admin can update squad" ON squads
  FOR UPDATE USING (
    created_by = auth.uid()
  );

CREATE POLICY "Anyone can view squad members" ON squad_members
  FOR SELECT USING (true);

CREATE POLICY "Members can view squad logs" ON daily_logs
  FOR SELECT USING (
    squad_id IN (SELECT squad_id FROM squad_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Users manage own logs" ON daily_logs
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Members can view evaluations" ON evaluations
  FOR SELECT USING (
    squad_season_id IN (
      SELECT ss.id FROM squad_seasons ss
      JOIN squad_members sm ON sm.squad_id = ss.squad_id
      WHERE sm.user_id = auth.uid()
    )
  );

CREATE POLICY "Users create own evaluations" ON evaluations
  FOR INSERT WITH CHECK (evaluator_id = auth.uid());
```

---

## 4. UI Component Architecture

```
src/
├── app/
│   ├── squads/              # NEW — squad routes
│   │   ├── page.tsx          # Squads list (my squads)
│   │   ├── create/
│   │   │   └── page.tsx      # Create squad form
│   │   ├── join/
│   │   │   └── page.tsx      # Join squad by invite
│   │   └── [squadId]/
│   │       ├── page.tsx      # Squad home / feed
│   │       ├── settings/
│   │       │   └── page.tsx  # Squad settings
│   │       ├── program/
│   │       │   ├── page.tsx  # Program overview
│   │       │   └── select/
│   │       │       └── page.tsx # Program selection
│   │       ├── members/
│   │       │   └── page.tsx  # Member management
│   │       └── season/
│   │           └── [seasonId]/
│   │               ├── page.tsx         # Season overview
│   │               └── evaluate/
│   │                   └── page.tsx     # Weekly evaluation
│   ├── programs/            # NEW — program library
│   │   ├── page.tsx          # Browse programs
│   │   ├── [programId]/
│   │   │   └── page.tsx      # Program detail
│   │   └── create/
│   │       └── page.tsx      # Custom / AI program creation
│   └── dashboard/
│       ├── page.tsx          # Dashboard (squad home if in squad)
│       └── ...               # Existing dashboard
│
├── components/
│   ├── squads/               # NEW
│   │   ├── SquadCard.tsx
│   │   ├── SquadFeed.tsx
│   │   ├── SquadStreakBadge.tsx
│   │   ├── SquadMemberList.tsx
│   │   ├── CreateSquadDialog.tsx
│   │   ├── JoinSquadDialog.tsx
│   │   ├── InviteCodeDisplay.tsx
│   │   └── SquadSettings.tsx
│   ├── programs/             # NEW
│   │   ├── ProgramCard.tsx
│   │   ├── ProgramDetail.tsx
│   │   ├── ProgramCalendar.tsx
│   │   ├── DayWorkout.tsx
│   │   ├── ProgramSelector.tsx
│   │   ├── AIProgramGenerator.tsx
│   │   └── CustomProgramBuilder.tsx
│   ├── season/               # NEW
│   │   ├── SeasonHeader.tsx
│   │   ├── DailyMission.tsx
│   │   ├── ExerciseSetCheckbox.tsx
│   │   ├── WorkoutCompleteButton.tsx
│   │   ├── SquadAttendanceBar.tsx
│   │   ├── EvaluationForm.tsx
│   │   ├── EvaluationCard.tsx
│   │   ├── EvaluationPointsBadge.tsx
│   │   └── SeasonFinale.tsx
│   ├── reactions/            # NEW
│   │   ├── ReactionButton.tsx
│   │   └── ReactionBar.tsx
│   └── ...                   # Existing components
```

### 4.1 Key Component Patterns

**DailyMission.tsx** — The primary user interaction:
- Server component renders program day data
- Client component handles exercise checkbox state
- Uses optimistic updates: checkboxes update instantly, background sync
- On complete: calls API route, updates squad feed via Supabase Realtime

**SquadFeed.tsx** — Social accountability hub:
- Subscribes to `daily_logs` + `workout_reactions` via Supabase Realtime
- Shows today's squad activity with avatars, time ago, reaction counts
- Empty state: "No one has worked out yet today — be the first!"
- React on tap: one-tap reaction button, instant push notification to recipient

**EvaluationForm.tsx** — Weekly evaluation:
- Progressive disclosure: shows one squadmate at a time
- 5-star tap input (touch-friendly, haptic feedback)
- Auto-saves each evaluation as completed
- Shows evaluation points balance and next-week unlock threshold

---

## 5. API Routes

```typescript
// NEW API routes
/api/squads                 // GET (list my), POST (create)
/api/squads/[id]            // GET, PATCH, DELETE
/api/squads/[id]/members    // GET, POST (join)
/api/squads/[id]/invite     // GET (generate/refresh code)
/api/squads/[id]/programs   // GET (list available), POST (select)
/api/squads/[id]/seasons    // GET, POST (start season)

/api/programs               // GET (library), POST (custom/AI)
/api/programs/[id]          // GET (detail with phases/days)
/api/programs/generate      // POST (AI generate)

/api/seasons/[id]/logs      // GET (season progress), POST (log workout)
/api/seasons/[id]/logs/today // GET (today's log for user)
/api/seasons/[id]/streak    // GET (squad streak data)

/api/evaluations/[seasonId]/[week]  // GET, POST (submit evaluations)
/api/evaluations/[seasonId]/points  // GET (eval points balance)

/api/reactions              // POST (add reaction)
/api/reactions/[logId]      // DELETE (remove reaction)
```

**Key endpoint patterns:**

`POST /api/seasons/[id]/logs/today` — complete today's workout:
```typescript
{
  program_day_id: string,
  exercises_completed: [{ name: string, sets_done: number, reps_done: number[] }],
  duration_minutes: number,
  notes?: string
}
// Returns: updated daily_log, xp_earned, squad_streak if applicable
// Side effects: update streak, notify squad via push, check badge unlocks
```

---

## 6. Integration with Existing Features

| Existing Feature | Integration |
|-----------------|-------------|
| **XP/Levels** | Squad workouts earn XP with squad streak multiplier (1.5x for 5+ day squad streak). XP feeds into existing level system. |
| **Streaks** | Individual streak continues from daily_logs. Squad streak is separate — both visible. |
| **Leaderboard** | Existing global leaderboard stays. New squad-specific leaderboard added (within-squad rankings). |
| **Badges** | New squad badges: "Squad Start" (first season), "Perfect Week" (all members 7/7), "Century Squad" (100-day squad streak). |
| **Coach Chat** | AI coach gains squad context: "Ahmed has been crushing it, but Karim missed 3 days — suggest a recovery plan." Coach can send squad-wide motivational messages. |
| **Tracks** | Existing tracks remain for solo use. Programs are a superset — program days reference exercises, not tracks. Programs and tracks coexist. |

---

## 7. Edge Cases & Error Handling

| Edge Case | Handling |
|-----------|----------|
| **Squad member drops out mid-season** | Their daily_logs archived. Program continues for remaining members. Member can rejoin later or be replaced (admin). |
| **Admin leaves squad** | Admin role auto-transfers to next member by join date. If no members remain → squad auto-archives after 30 days. |
| **Member doesn't evaluate for 2 weeks** | Blocked from advancing. Push notification: "You need 5 eval points to unlock Week X. Evaluate your squadmates to earn them." |
| **No one evaluates** | System auto-grants minimum eval points to prevent complete stall. "Your squadmates haven't evaluated yet — here are 2 courtesy points to keep moving." |
| **Missed day (streak break)** | Streak resets to 0. "Day 0 — let's start a new streak today!" Notification is encouraging, not punishing. |
| **Squad size drops below 4** | Squad becomes inactive for new seasons. Current season continues. Prompt admin: "Invite more members to start your next season." |
| **Multiple active seasons** | A user can be in multiple squads simultaneously. Each squad has its own season, feed, evaluations. |
| **AI program generation failure** | Fallback: show error with "Try a simpler description" + suggest pre-built library programs. |
| **Arabic localization** | All new UI strings in EN/AR via existing next-intl setup. Squad feed, evaluation form, reactions — all bilingual. |
| **Real-time disconnection** | Supabase Realtime auto-reconnects. Optimistic UI ensures user can still complete workout offline — logs sync on reconnect. |

---

## 8. Implementation Plan

### Phase 1: Foundation (Data Model + Squads)
1. Create SQL migration (squads, squad_members, squad_streaks)
2. Create API routes for squads CRUD + invite
3. Build SquadCard, CreateSquadDialog, JoinSquadDialog, InviteCodeDisplay
4. Add squad routes to navigation
5. **Eval:** Create a squad, join via invite code, view squad page

### Phase 2: Programs (Library + Days)
1. Create SQL migration (programs, program_phases, program_days)
2. Seed 2-3 pre-built programs (12-week calisthenics, bodyweight beginner)
3. Build ProgramSelector, ProgramCard, ProgramDetail, ProgramCalendar
4. Build DayWorkout, ExerciseSetCheckbox, DailyMission
5. **Eval:** Browse programs, view daily workout, toggle exercise checkboxes

### Phase 3: Daily Flow (Logging + Feed)
1. Create SQL migration (daily_logs, squad_seasons, workout_reactions)
2. Build WorkoutCompleteButton, SquadFeed, ReactionButton
3. Add Supabase Realtime subscriptions for live feed
4. Build squad streak logic (all members same day = streak day)
5. Integrate XP calculation with squad multiplier
6. **Eval:** Complete a workout, see it appear in feed, react to squadmate, verify streak calculation

### Phase 4: Peer Evaluation (42-style)
1. Create SQL migration (evaluations, evaluation_points)
2. Build EvaluationForm (progressive disclosure, one member at a time)
3. Build EvaluationPointsBadge, EvaluationCard
4. Build evaluation points currency logic (earn by evaluating, spend to advance)
5. Add weekly evaluation schedule (cron + push notification)
6. **Eval:** Submit evaluations for all squad members, verify points balance, verify week unlock

### Phase 5: Season Management + Polish
1. Build squad settings, member management, season archive
2. Build SeasonFinale (celebration screen, share card)
3. Add squad badges (Squad Start, Perfect Week, Century Squad)
4. Add squad leaderboard (within-squad rankings)
5. Coach chat squad integration (squad context, squad-wide messages)
6. AI program generation endpoint
7. Edge case handling (dropout, admin transfer, low squad size)
8. Arabic localization for all new strings
9. **Eval:** Full end-to-end: create squad → invite → pick program → complete season → evaluate → celebrate → start new season

---

## 9. Key Design Decisions (ADRs)

### ADR-001: Squad Size Cap at 8
- **Context:** Accountability research shows small groups outperform large ones
- **Decision:** Hard cap at 8, minimum 4 to start
- **Rationale:** Arvo's 88% weekly retention with 4-8 crews vs 4% industry average at day 30
- **Trade-off:** Excludes larger friend groups, but they can split into multiple squads

### ADR-002: Anonymous Peer Evaluations
- **Context:** 42 school uses named evaluations, but fitness is more personal
- **Decision:** Anonymous evaluations, only aggregate scores visible
- **Rationale:** Reduces social awkwardness, increases honesty in a non-professional setting
- **Trade-off:** Less direct accountability, but higher psychological safety

### ADR-003: Evaluation Points as Currency
- **Context:** Must earn points to unlock next week
- **Decision:** Hard requirement (not optional bonus)
- **Rationale:** Creates the 42-style reciprocal loop. Without mandatory participation, evaluations won't happen consistently
- **Trade-off:** Higher friction, but this friction IS the accountability mechanism

### ADR-004: Same Program for All Squad Members
- **Context:** Members at different fitness levels
- **Decision:** Same program, but AI can adjust difficulty per member (reps/sets/weight)
- **Rationale:** Shared experience is what creates squad cohesion. Individual adjustments preserve inclusivity without fragmentation
- **Trade-off:** Advanced members may feel held back, but squad social cohesion > individual optimization

---

## 10. Spec Self-Review

- **Placeholder scan:** No TBDs, TODOs, or incomplete sections. All schema, components, routes, and edge cases specified.
- **Internal consistency:** Schema references match between tables. Component tree matches routes. API routes match data model. All existing features properly integrated.
- **Scope check:** Single cohesive feature (squad accountability system). Can be built incrementally across 5 phases. Not too large for a single implementation plan.
- **Ambiguity check:** All decisions explicit — squad size (4-8), evaluation anonymity (yes), currency (mandatory), program model (same program, AI-adjusted). No ambiguous requirements.
