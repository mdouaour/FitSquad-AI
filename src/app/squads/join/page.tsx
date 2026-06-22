'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, UserPlus, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function JoinSquadPage() {
  const [code, setCode] = useState('')
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = code.trim().toUpperCase()
    if (trimmed.length < 7) {
      setError('Invite code must be at least 7 characters (e.g. FIT-XXXX)')
      return
    }
    setError('')
    setJoined(true)
  }

  if (joined) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#00D68F]/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#00D68F]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Joined Successfully!</h2>
          <p className="text-gray-400 mb-6">
            You&apos;re now part of the squad. Start your journey!
          </p>
          <Link href="/squads">
            <Button variant="primary" size="lg" className="w-full">
              Go to My Squads
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link
          href="/squads"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Squads
        </Link>

        <div className="bg-[#13131A] border border-[#1E1E2E] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#7B2FBE]/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[#7B2FBE]" />
            </div>
            <h1 className="text-xl font-bold text-white">Join Squad</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5 font-medium">
                Invite Code
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="FIT-XXXX"
                maxLength={10}
                className="w-full bg-[#0A0A0F] border border-[#1E1E2E] rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#7B2FBE] transition-colors uppercase tracking-[0.2em] font-mono text-center text-2xl"
              />
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-[#7B2FBE] hover:bg-[#9B4FDE]"
              disabled={code.trim().length < 6}
            >
              Join Squad
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
