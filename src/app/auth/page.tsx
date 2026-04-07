'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Zap } from 'lucide-react'
import clsx from 'clsx'

type Tab = 'login' | 'signup'

export default function AuthPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    fullName: '',
  })

  const isDemo = !(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (isDemo) {
      setNotice('Demo mode: Supabase not configured. Redirecting to dashboard...')
      setTimeout(() => router.push('/dashboard'), 1500)
      setLoading(false)
      return
    }

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      if (tab === 'login') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
        if (authError) throw authError
        router.push('/dashboard')
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              username: form.username,
              full_name: form.fullName,
            },
          },
        })
        if (authError) throw authError
        setNotice('Check your email to confirm your account!')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#7B2FBE]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#7B2FBE] mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#7B2FBE] bg-clip-text text-transparent">
            FitSquad AI
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Gamified Bilingual Fitness</p>
        </div>

        {/* Card */}
        <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-6">
          {/* Tabs */}
          <div className="flex bg-[#0A0A0F] rounded-xl p-1 mb-6">
            <button
              onClick={() => { setTab('login'); setError(null); setNotice(null) }}
              className={clsx(
                'flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                tab === 'login'
                  ? 'bg-[#FF6B35] text-white'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              Login
            </button>
            <button
              onClick={() => { setTab('signup'); setError(null); setNotice(null) }}
              className={clsx(
                'flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                tab === 'signup'
                  ? 'bg-[#FF6B35] text-white'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              Sign Up
            </button>
          </div>

          <h2 className="text-xl font-bold text-white mb-1">
            {tab === 'login' ? 'Welcome Back' : 'Join FitSquad AI'}
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            {tab === 'login' ? 'Your squad is waiting' : 'Start your fitness journey'}
          </p>

          {notice && (
            <div className="bg-[#00D68F]/10 border border-[#00D68F]/30 rounded-xl p-3 mb-4 text-[#00D68F] text-sm">
              {notice}
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="warrior_42"
                    className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                    placeholder="Mohamed Al-Rashid"
                    className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FF6B35] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B35] hover:bg-[#FF8C5A] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-200 active:scale-95 mt-2"
            >
              {loading ? 'Loading...' : tab === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>

          {isDemo && (
            <div className="mt-4 p-3 bg-[#7B2FBE]/10 border border-[#7B2FBE]/30 rounded-xl">
              <p className="text-[#7B2FBE] text-xs text-center">
                🎮 Demo Mode — Configure Supabase to enable auth
              </p>
            </div>
          )}

          <div className="mt-4 text-center">
            <Link href="/dashboard" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Continue as guest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
