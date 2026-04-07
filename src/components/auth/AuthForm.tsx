'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (data: { email: string; password: string; username?: string; fullName?: string }) => void
  loading?: boolean
  error?: string | null
}

export default function AuthForm({ mode, onSubmit, loading, error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', username: '', fullName: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm">
          {error}
        </div>
      )}
      {mode === 'signup' && (
        <>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input type="text" required value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35] transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full Name</label>
            <input type="text" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35] transition-colors" />
          </div>
        </>
      )}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Email</label>
        <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35] transition-colors" />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Password</label>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35] transition-colors pr-12" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <button type="submit" disabled={loading} className="w-full bg-[#FF6B35] hover:bg-[#FF8C5A] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all active:scale-95">
        {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Create Account'}
      </button>
    </form>
  )
}
